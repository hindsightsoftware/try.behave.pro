---

title: Concurrent test execution Part 2 - Moving on from batched based concurrency to Multithreading
author: aparkinson
date: 2013-03-30
layout: post
categories: engineering
---

![Batched test jobs 1](/assets/images/post/batched-test-jobs-feedback-timegraph1.png)

Whilst the divide and conquer strategy of grouping tests into batches for concurrent execution is a simple method of speeding up test suites, it’s not perfect. The better solution would be to execute tests concurrently using multiple threads and take advantage of the multiple core’s available in modern processors.

In [part 1](/blog/2012/10/30/running-tests-in-parallel/) of this series on concurrent test execution I went into detail on how to break test suites into batches and run each batch on separate machines. This is easy to achieve using spare hardware, Virtual Machines or Cloud computing resources. This happens to be the simplest technique for concurrent test execution as it doesn’t require any additional code, but being simple is not always best.

![Batched test jobs 2](/assets/images/post/batched-test-jobs-feedback-timegraph2.png)

## Batch size

Selecting tests for each batch is a manual process and estimates on execution time have to be made if each batch is to be of an even size.  The number of tests in the batch group, individual execution time, and the variation in performance of the underlying hardware will all affect the total execution time of each test batch. If all test batches were triggered at the same time, you would have to wait until the longest running test batch finishes before receiving for your results.

<div class="clear"></div>

## CI Scheduling 

![Batched test jobs 3](/assets/images/post/batched-test-jobs-feedback-timegraph3.png)

To avoid additional coding, each batch group is executed in it's own CI job to leverage the scheduling and resource capabilities of CI systems. 
This can represent another delay to receiving test results as the jobs are bound to the available resources (Build Slaves/Agents) and scheduling
 rules of the CI server. In most CI systems you would have more than one project and many committers triggering jobs. This means your test batches 
 might have to wait before they are scheduled to run, and they won’t all start at the same time.

Tip: Don’t create more test batches than the number of available build slaves or agents. On CI systems with high resource contention (long wait 
before jobs are scheduled to run) it's wise to have fewer test batches than build slaves to avoid likely contention.


<div class="clear"></div>

## How about going multi-threaded?

You are probably aware that over the last 3 years the majority of unit test runners have added the option for executing tests in parallel using threading.
 This feature is a great way to take advantage of the multiple cores available in modern processors for true concurrent test execution. If you are 
 investing in your test suite for the long term I highly recommend going for true parallel test execution using threading over the batched test method. 

### Configuring Maven and JUnit for parallel test execution

Parallel Test execution with Maven and JUnit requires a JUnit version 4.7 or greater. Those of you already familiar with the Maven Surefire plugin may 
know it can dynamically detect your JUnit version and enable and disable features based on the JUnit version. In theory by including the JUnit 4.7+ 
dependency in your Maven project the parallel test configuration options should be enabled, however if another dependency in your project includes an older 
version of JUnit it may use this version. Luckily it's rather simple to tell Surefire which JUnit version to support by specifying a dependency of the 
Surefire plugin. For JUnit 4.7+ you need to use “surefire-junit47”

``` xml
<plugins>
    ...
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>2.14</version>
        <dependencies>
            <dependency>
                <groupId>org.apache.maven.surefire</groupId>
                <artifactId>surefire-junit47</artifactId>
                <version>2.14</version>
             </dependency>
        </dependencies>
    </plugin>
    ...
</plugins>
```

### Enabling parallel execution

Once the correct version of JUnit has been configured it's a simple case of adding the "parallel" parameter to the Surfire plugin configuration
 and we have a basic parallel execution configuration. The "parallel" parameter can have one of three values; "methods", "classes", or "both". 

 ``` xml
<plugins>
    ...
    <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-surefire-plugin</artifactId>
        <version>2.14</version>
        ...
        <configuration>
            <parallel>methods</parallel>
        </configuration>
    </plugin>
    ...
</plugins>
```
By default Surefire will create a test execution thread for each available core on the machine executing the tests. This default is satisfactory 
in many situations and can be overridden by the “perCoreThreadCount” and “threadCount” parameters. 

``` xml
<configuration>
    <parallel>methods</parallel>
	<perCoreThreadCount>false</perCoreThreadCounts>
	<threadCount>2</threadCount>
</configuration>
```

## Considerations

Before you dive straight into configuring Maven and JUnit for parallel test execution you need to consider if the test suite is ready for it.  It might not be straight forward to switch test suites straight over without consequences

The most significant consideration is around your tests being atomic and isolated from each other. This means the results or side effects from previous tests does not affect the execution and result of the current test. A good example of this is stale test data left over from a previous test; the previous test may have deleted or modified data the current depends on. This error may have gone unnoticed due to different test execution ordering in the past.

One common technique for ensuring test isolation is to setup the System Under Test (SUT) with known clean data before each individual test is executed. People typically do this by using SQL scripts to clean and insert a small amount of data in to the database. With concurrent test execution you will have a problem with this technique due to a race condition in accessing and cleaning the database.  You might be in the middle of executing test 1, and test 2 starts executing and cleaning the database. 

My solution to this problem is to create unique non-repeatable test data on demand (before each test executes). As the data is unique and non-repeatable,  this provides our tests with isolation from each other and avoids having to clean out data from other tests.

I will be discussing this solution over several blogs in the future, so keep an eye out for them.

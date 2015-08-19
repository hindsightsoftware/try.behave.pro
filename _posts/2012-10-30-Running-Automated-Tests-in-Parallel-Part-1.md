---

title: Running Automated Tests in Parallel - Part 1
author: aparkinson
date: 2012-10-30
layout: post
categories: engineering
---

Automated functional tests provide valuable feedback to developers by notifying them when they have completed or broken functionality. The value of these tests can be
maximised by providing the test results in the shortest possible time. The reason being the problem is likely to be fresh in the developer's mind and quicker for them to fix.

A typical functional or UI test suite can take many hours to run because the tests can only be run sequentially. The main cause for the sequential tests is the dependence
on data. Common practice has test cases clear the database of the application under test and populate it with the required data before it starts. This high level of database
manipulation does not allow the tests to be run in parallel because each test will interfere with the database at different times, therefore corrupting data required used by other tests.

![Batched Tests to different executors](/assets/images/post/batched_test_jobs.png)

The common solution for long running test suites is to break them into batches and run each batch on a separate machine with its own instance of the application under test
and its database. This is easy to achieve using spare hardware, Virtual Machine's or Cloud computing resources. You don't even have to write code for spinning up new
machines, or access remote machines, as Continuous Integration (CI) servers like Jenkins and Bamboo provide functionality for running builds on multiple computers. This feature is better known as Slaves or Agents.

The majority of the popular testing tools have ways of grouping tests together and we can use this feature to create our "Batches" of tests. These features are known as
"categories" in JUnit, "groups" in TestNG and "tags" in Cucumber, Lettuce and Behat.

## Creating batches of Tests with JUnit
JUnit 4.8 introduces a '@Category' annotation for specifying the group that the test class (which will include all the methods within the class) or method belongs to.
The category names for tests are not defined as Strings but as Java Classes, so for each batch or test category we will need to create a Java interface to represent it.
We could create a plain Java Class instead of an interface but as the class will never instantiated and no methods need to be implemented, it's safer to use interfaces.
Tests can be assigned to a category by simply adding the "Category" annotation to the test class or method with the appropriate interface representing the batch as a parameter.

``` java
import org.junit.Test;
import org.junit.experimental.categories.Category;
import com.hindsighttesting.junit.batches.BatchA;
@Category(BatchA.class)
    public class MyTest {
        @Test
		@Category(Slow.class)
		public void aTest() {
	        ...
	}
}
```

## Running a Batch of Tests

To adapt an existing Maven build for running your tests using the JUnit categories is rather simple. The first step is to configure the `maven-surefire-plugin` to use the correct
JUnit provider. Support for Categories is available in the JUnit 4.7 Surefire Provider and this can be configured just by adding the `org.apache.maven.surefire:surefire-junit47`
 dependency to the `maven-surefire-plugin`.

``` xml
<build>
    <plugins>
        ...
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-surefire-plugin</artifactId>
            <version>2.11</version>
            <dependencies>
                <dependency>
                    <groupId>org.apache.maven.surefire</groupId>
                    <artifactId>surefire-junit47</artifactId>
                    <version>2.12</version>
                </dependency>
            </dependencies>
        </plugin>
        ...
    </plugins>
</build>
```

There are two ways of specifying the categories to use for selecting tests to execute. The first is to specify the category in the `groups` property of the Plugin configuration within your POM file.

``` xml
<configuration>
    <groups>com.hindsighttesting.junit.batches.BatchA</groups>
</configuration>
```

The disadvantage of this method is the lack of flexibility in specifying which test batch/category should be executed. You could use Maven profiles to provide the flexibility but this would
increase the size and complexity of the POM file. Handy for us, the `groups` property can be specified from the command line as a property.

``` shell
$ mvn test -Dgroups=com.hindsighttesting.junit.batches.BatchA
```

### Configuring the Continuous Integration (CI) jobs

Now that we know how to select tests as groups to run as batches we need to configure our CI server to schedule and run all our Test batches at the same time. For each batch we need to create
a new build job and configure it to run the appropriate JUnit test batch.

We need to trigger and execute all our Test batch jobs once the upstream job ("compile" in the diagram) has successfully completed and only execute the downstream job once all the Test batch jobs have completed.

![Ci Job Structure](/assets/images/post/ci-job-structure.png)

In Jenkins/Hudson we can easily trigger all the test batch jobs by using `Post-build Actions` and selecting `Build other projects`.

![Jenkins post build screenshot](/assets/images/post/jenkins-post-build-actions.png)

Waiting for all Batched test jobs to finish before starting the next job is not so simple. For this we require the [Join Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Join+Plugin)
and this adds a new "Post-build Action" called "Join Trigger". The "Join Trigger" is added as a "Post Build action" to the upstream job that triggers our batched test jobs. The upstream job will then trigger the
downstream job to start once all the batched tests are finished.

![Jenkins join trigger screenshot](/assets/images/post/jenkins-join-trigger.png)


## Conclusion

We have described a simple way of speeding up large sequential test suites by breaking tests down into batches and running each batch concurrently on separate machines using the slave/agent
functionality of CI servers. It's worth remembering this isn't true concurrent test execution and there are drawbacks to this technique when compared to true concurrency:

  * Scaling is limited by machine availability
  
  * Available processing power is used inefficiently e.g. by not using all available CPU cores
  
  * Additional time is required to manage batches of tests - tests have to be moved between batches to even out total test execution time.

At [OREDEV 2012](http://oredev.org/2012/sessions/cutting-testing-time-with-parallel-automated-functional-tests) I will be discussing the disadvantages of this pseudo concurrent
technique and how true concurrent test execution can be achieved. For those of you who are not attending OREDEV this year or who miss my presentation (there are so many great presentations scheduled), I will be
following up with additional posts over the next 8 weeks to expand on this topic.

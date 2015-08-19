---

title: Security testing with Selenium and the Zed Attack Proxy (ZAP)
author: aparkinson
date: 2012-05-18
layout: post
categories: engineering
---

A few weeks ago I had the pleasure of speaking at the 2012 Selenium Conf in London. My presentation was on "Automated Security Testing" using Selenium and the Zed Attack Proxy. All the SeConf presentations have been recorded and I thought I would share my talk with you now it has been published.

<object style="height: 460px; width: 760px"><param name="wmode" value="transparent"><param name="movie" value="http://www.youtube.com/v/aVFZFi_6B9g?version=3&feature=player_detailpage"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><embed src="http://www.youtube.com/v/aVFZFi_6B9g?version=3&feature=player_detailpage" type="application/x-shockwave-flash" allowfullscreen="true" allowScriptAccess="always" width="760" height="460"></object>

### Recreating my demo ###

1. Install Chrome if not already installed
2. Start Jenkins on port 80. I used a fresh install of Jenkins with no configuration changes
3. Start the [Zed Attack Proxy (ZAP)](https://www.owasp.org/index.php/OWASP_Zed_Attack_Proxy_Project), no additional configuration required.
4. Run the JUnit test "JobManagementTest" in my [GitHub project](https://github.com/aparkinson/jenkins-webdriver). Note: This test uses Chrome.

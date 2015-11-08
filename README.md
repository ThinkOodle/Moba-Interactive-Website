![Moba / Oodle Logo](https://raw.githubusercontent.com/ThinkOodle/Moba-Interactive-Website/gh-pages/assets/images/moba-oodle-logo-lockup.png)

# Basic Details
This is the new website for www.mobainteractive.com after the acquisition by Oodle.

The site is built using (Jekyll)[https://jekyllrb.com/] and published to the web via (GitHub Pages)[https://pages.github.com/].

All of the files you should edit are contained in the `app` folder. The `_site` folder is utilized for deployment.

# Initial Setup
Clone this repository

```
git clone https://github.com/ThinkOodle/Moba-Interactive-Website.git
```

Install dependencies

```
npm install
```

Done! You're ready to edit to your heart's content.

# Deploying Updates
Making updates is super-simple.

While working in local mode, run `gulp` to build the site and launch a (Browsersync)[http://www.browsersync.io/] instance so you don't have to constantly hit the refresh button.

When you're ready to deploy to GitHub, push your changes then run `gulp deploy`.

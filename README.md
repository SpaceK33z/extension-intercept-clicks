# extension-intercept-clicks

Clone this repository locally and go to chrome://extensions/ and load this Chrome extension. There's no build step.

## What do we want

We want to intercept all click events on a webpage and programmatically execute the "click" event one second later (the one second is arbitrary, it's just to demonstrate the issue).

We want this because we want to take the "perfect" screenshot when a user clicks on something; we want to take that screenshot just before anything changes on the webpage. If we don't intercept clicks and slightly delay them, most of the screenshots would be taken too late.

## What is the issue?

We can intercept the click events in most cases properly with `capture: true` on the event listener, but there's two issues;

* Sometimes our click event is still registered after other events on the webpage, we need it to be the first one always
* We cannot manually click an element if it would execute inline JS (e.g. `<a href="javascript:doSomething()" />`)

## Some ways to reproduce it

A practical example of our click event not being first can be found at [Google Calendar](https://calendar.google.com/calendar/u/0/r). On that webpage, click on the Settings icon top right. You'll notice a one second delay (good). Then click on Settings inside the dropdown. You will notice that there's no delay (bad).

One example of inline JS not working is on [PublicSurplus.com](https://publicsurplus.com/sms/browse/home). On that webpage, top-right there is a language selector. Select e.g. "Spanish" there. You will notice that nothing happens at all, and there is an error message in the console.

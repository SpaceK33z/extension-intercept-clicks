# extension-intercept-clicks

Clone this repository locally and go to chrome://extensions/ and load this Chrome extension. There's no build step.

## What do we want

We want to intercept all click events on a webpage and programmatically execute the "click" event one second later (the one second is arbitrary, it's just to demonstrate the issue).

We want this because we want to take the "perfect" screenshot when a user clicks on something; we want to take that screenshot just before anything changes on the webpage. If we don't intercept clicks and slightly delay them, most of the screenshots would be taken too late.

## What is the issue?

We can intercept the click events in most cases properly but there's two issues;

* We cannot manually click an element if it would execute inline JS (e.g. `<a href="javascript:doSomething()" />`)
* If a webpage checks the event for `event.isTrusted` and decides to ignore untrusted events our handling would fail

Is there any way to fix these two issues, or one of them?

## Some ways to reproduce it

One example of inline JS not working is on [PublicSurplus.com](https://publicsurplus.com/sms/browse/home). On that webpage, top-right there is a language selector. Select e.g. "Spanish" there. You will notice that nothing happens at all, and there is an error message in the console.

A basic example of `isTrusted` can be found in `/test.html`, with `npx serve .` in this repo you can open it.

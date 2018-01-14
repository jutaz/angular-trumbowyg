# angular-trumbowyg

This is an angular component for [`trumbowyg`](https://github.com/Alex-D/Trumbowyg).

## Installing

`npm install angular-trumbowyg`

Load either `./dist/angular-trumbowyg.js` or `./dist/angular-trumbowyg.min.js`.

Add `trumbowyg` as your app's dependency in your app declaration.

## Usage

```html
<trumbowyg ng-model="$ctrl.html"
  ng-change="$ctrl.updateHTML()"
  ng-disabled="$ctrl.isInputDisabled"
  placeholder="Start typing some text..."
  options="{btns: [['bold', 'italic'], ['unorderedList', 'orderedList']]}">
</trumbowyg>
```

This component also supports events that are emitted by the `trumbowyg` itself. Here's the list of currently supported events:


- `focus`
- `blur`
- `init`
- `change`
- `resize`
- `paste`
- `openfullscreen`
- `closefullscreen`
- `close`

Any of those events can be listened on by specifying an attribute. For example, the following will listen for `blur` event:

```html
<trumbowyg ng-model="$ctrl.html"
  on-blur="$ctrl.onBlur()"
  options="{btns: [['bold', 'italic'], ['unorderedList', 'orderedList']]}">
</trumbowyg>
```

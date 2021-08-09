# Contributing

<img align="right" src="https://raw.githubusercontent.com/SNDST00M/material-dynmap/v0.41/assets/icon.svg" width="96px">
This userscript follows a weekly release schedule every Thursday prior to 12:00AM UTC. This ensures that users will not be spammed with updates from OpenUserJS and their Tampermonkey/Greasemonkey extension.

Here are a few ways you can contribute to this repository:

- Create issues
  - Request features
  - Report bugs
- Open pull requests

## Create issues

### Request features

If you are requesting features, please check if a similar issue exists. If the feature request does not exist, please make a feature request & include the following information:

- Precise description of feature.
- Is the feature probably a major or minor change?
  - Major = new dependencies, design elements, features or full rework.
  - Minor = developer changes or minor implementation-related work.
- Is this item on the [roadmap] or not?

Please limit your requests to one feature per issue.

### Report bugs

If you are reporting bugs, please include the following information in your report:

- Broswer version
- OS version
- Does this issue occur when other extensions are disabled?
- Steps to reproduce
- Code sample or screenshot (MVCE)
- Bug description (expected vs actual behaviour)

Please limit your description and code sample/screenshot(s) to one MVCE (Minimum Complete Verifiable Example).

## Open pull requests

1. Fork the project

2. Clone your fork

3. Create a **`feature`** branch

   ```sh
   git checkout -b cool-feature
   ```
   
4. Commit your changes

   You **must** follow the [conventional commit][conventionalcommits] to be able to commit
   ```sh
   git commit -m "Added cool feature"
   ```

5. Check the scripts work in the [latest modern browsers][updatemybrowser]:
   - Latest version of Chrome
   - Latest version of Edge
   - Latest version of Firefox
   - Latest version of Opera
   - Latest version of Safari

<!-- Create issues -->
[roadmap]: https://github.com/SNDST00M/material-dynmap/blob/main/CHANGELOG.md#roadmap
<!-- Open pull requests -->
[conventionalcommits]: https://conventionalcommits.org/
[updatemybrowser]: https://updatemybrowser.org/

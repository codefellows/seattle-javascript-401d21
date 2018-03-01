![cf](http://i.imgur.com/7v5ASc8.png) 34: UI Styling
===
----

## Daily Plan
- Notes:
    - Anything top of mind?

- Code Review
- Review of SCSS: _What questions are there?_
- Review of SMACSS-ish structure for component-based architecture
- Custom forms: _Build a slider checkbox_
- Lab Preview

## Learning Objectives
* students will be able to use SCSS to create component based and modular CSS styles
* students will be able to *generally* conform to the SMACCS principles for creating base, layout, and theme containers for their application styles
* students will be able to create and use global SCSS variables for reusable styles
* students will have a level of competency is styling custom form elements within an application

## Resources
* [sass getting started guide](http://sass-lang.com/guide)

## Overview
* SCSS is a variation of SASS, which stands for "syntactically awesome stylesheets"
  * SCSS gives us the ability to do the following things with our CSS styles
    * creation of modular css "partials"
    * nesting of CSS rules
    * ability to import partials into/from other partial files
    * ability to create functional CSS components and mixins
    * ability to use math operators in CSS
* SCSS partials are often modularized to fit the following structure:
  - **style**
    - **lib**
      - **base**
        - `_base.scss`
        - `_reset.scss`
      - **theme**
        - `_vars.scss`
      - **layout**
        - `_header.scss`
        - `_footer.scss`
        - `_content.scss`
  - **component**
    - **my-component-dir**
      - `_my-component-dir.scss`
    - **another-component-dir**
      - `_another-component-dir.scss`

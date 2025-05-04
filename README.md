# Angular 16 Merge Editor Component
This repository contains a three-way merge editor component for Angular 16, similar to VS Code's GitHub merge conflict resolver. It provides an intuitive interface for resolving merge conflicts with side-by-side comparison of original and modified versions.
## Overview
The merge editor is designed as a non-standalone Angular component that uses Monaco Editor via CDN to provide a powerful code editing and diffing experience. It consists of three panels:

- Original - Shows the original file content
- Modified - Shows the modified file content with changes
- Resolved - Shows the resolved content after merging

## Features

+ Side-by-side comparison of original and modified files
+ Syntax highlighting for better code readability
+ Diff highlighting with red/green indicators for removed/added lines
+ + and - icons in the gutter to indicate changes
+ Navigation between differences
+ Accept Current/Incoming buttons to choose changes
+ Merged result preview and saving
# Issue Manager Action

This is a GitHub Action developed specifically for internal use within the CAE-Física organization. Please note that this action may not be suitable or work correctly for other use cases.

## Description

The CAE-Física GitHub Action is designed to automate certain tasks related to managing issues in the CAE-Física organization's web repository. The action scans the repository's issues and performs specific actions on issues that have a title starting with '[📚]:'.

The action uses the Octokit library to interact with the GitHub API. It requires authentication using a GITHUB_TOKEN provided by GitHub.

## Features

- Identifies issues with titles starting with '[📚]:'.
- Updates the issue body using the updateIssue component.
- Updates labels on the issue using the updateLabels component.
- Includes a delay of 1000 milliseconds between issue processing to avoid rate limits.

## Usage

To use the CAE-Física GitHub Action in your workflow, you need to add a step with the following configuration in your workflow file (e.g., .github/workflows/my-workflow.yml):

```yaml
name: My Workflow

on:
  # Add your desired workflow triggers here

jobs:
  my-job:
    name: My Job
    runs-on: ubuntu-latest

    steps:
      - name: Issue Management
        uses: totallynotdavid/Issue-Manager-Action
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

![FlyByWire Simulations](https://raw.githubusercontent.com/flybywiresim/branding/1391fc003d8b5d439d01ad86e2778ae0bfc8b682/tails-with-text/FBW-Color-Light.svg)

# FlyByWire Installer Configuration Data

Configuration data for the FlyByWire Simulations Installer.

The aim of this project is to provide a means to separate the installer configuration from the installer itself. This allows us to update the installer configuration without having to update the installer itself.

## Configuration

The configuration is defined in the `config.ts` file.

Once merged to staging, the configuration is automatically deployed to the CDN (`https://cdn.flybywiresim.com/installer/config/staging.json`).

A maintainer can then manually deploy the configuration to the production branch (`https://cdn.flybywiresim.com/installer/config/production.json`).

## Contributing

### Update to the Installer Configuration

To change the configuration, please submit a pull request with your changes to the `config.ts` file.

To build the configuration locally, run `npm run build <filename>`. The resulting json file will be placed in the `dist` folder. This is only for testing purposes. You can use the file to test your configuration locally by using this URL: `file://{path to json file}`

If a PR is created from a branch of the main repo (and not a fork) the configuration will be automatically build and deployed to the CDN. The URL will be `https://cdn.flybywiresim.com/installer/config/pr-<PR-NUMBER>.json`.

For testing the PR configuration copy the URL and paste it into the installer configuration URL field in the installer settings. Ask on the FlyByWire's Discord [#installer](https://discord.com/channels/738864299392630914/757387126173204540) channel on how to do this.

### Installer Data Project

Please submit a pull request with your changes to the `installer-data` project.
                                                       
## Planned Feature

- [] Modularize the installer configuration (e.g. publisher, add-ons, etc. get their own files and build will compile them into a single file)

![FlyByWire Simulations](https://raw.githubusercontent.com/flybywiresim/branding/1391fc003d8b5d439d01ad86e2778ae0bfc8b682/tails-with-text/FBW-Color-Light.svg)

# FlybyWire Installer Configuration Data

Configuration data for the FlyByWire Simulations Installer.

The aim of this project is to provide a means to separate the installer configuration from the installer itself. This allows us to update the installer configuration without having to update the installer itself.

## Configuration

The configuration is defined in the `config.ts` file.

## Contributing

### Configuration

To change the configuration, please submit a pull request with your changes to the `config.ts` file.
 
### Installer Data project

Please submit a pull request with your changes to the `installer-data` project.
                                                       
## Planned Feature

- [] Basic configuration be downloadable from the CDN
- [] Add features to the installer to allow for configuration updates
- [] Modularize the installer configuration (e.g. publisher, add-ons, etc. get their own files and build will compile them into a single file)

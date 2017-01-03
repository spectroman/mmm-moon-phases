# Magic Mirror Module: mmm-moon-phases
This [MagicMirror2](https://github.com/MichMich/MagicMirror) module allows you to fetch an image of the moon in its current phase

## Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
git clone https://github.com/spectroman/mmm-moon-phases.git
````

Configure the module in your `config.js` file.

## Using the module

There isn't much to configure really, you just need to position it and optionally set a suitable size for you via the config options.

Now add the module to the modules array in the `config/config.js` file:
````javascript
modules: [
        {
                module: 'mmm-moon-phases',
                header: 'Current Moon Phase',   // optionally you can add a header to this block
                position: 'bottom_left',        // this can be any of the regions
                config: {
                }
        },
]
```
## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `height` | 200 | The height of the image. |
| `width` | 200 | The width of the image. |

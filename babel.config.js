module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],

    plugins: [
      ['module:react-native-dotenv', {
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": null,
        "blacklist": null, // DEPRECATED: use "blocklist"
        "whitelist": null, // DEPRECATED: use "allowlist"
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
    ]
    
    
  };
};

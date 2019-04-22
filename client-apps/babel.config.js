module.exports = function (api) {
  const isWebpack = api.caller((caller) => {
    return caller.name === 'babel-loader';
  });

  api.cache(true);

  const clientConf = {
    targets: {
      chrome: '70'
    }
  };

  const serverConf = {
    targets: {
      node: true,
    }
  };

  return {
    presets: [['@babel/preset-env', isWebpack ? clientConf : serverConf], '@babel/preset-react']
  };
};

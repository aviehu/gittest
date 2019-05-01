import React, { useContext, useEffect } from 'react';

import useChannelManager from './core/channel-manager';

const Context = React.createContext();

function Provider({ children }) {
  const [channels, addChannel, removeChannel] = useChannelManager();

  function subscribe(channel) {
    addChannel(channel);

    return () => {
      removeChannel(channel);
    };
  }

  return <Context.Provider value={{ subscribe, ...channels }}>{children}</Context.Provider>;
}

export function useBoundChannel({ channel }) {
  const context = useContext(Context);

  useEffect(() => {
    const unsub = context.subscribe(channel);

    return () => {
      unsub();
    };
  }, []);

  return context[channel] || {};
}

export default {
  Provider,
  Consumer: Context.Consumer
};

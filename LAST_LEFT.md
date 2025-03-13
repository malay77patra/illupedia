we are getting an warning: 

> For React refresh to work correctly, your file should only export React components. You can find a good explanation in the Gatsby docs.

> If an incompatible change in exports is found, the module will be invalidated and HMR will propagate. To make it easier to export simple constants alongside your component, the module is only invalidated when their value changes.

> You can catch mistakes and get more detailed warning with this eslint rule.

which is very easy to fix, just seperate the contexts and providers, i have made the /providers folder and added it to alias, just use it.
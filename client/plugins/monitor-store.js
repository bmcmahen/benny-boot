module.exports = monitor;

/**
 * @ripple plugin
 * 
 * Monitor a store for changes and update
 * our ripple view.
 * 
 * @param  {Store} store 
 */

function monitor(store){
  return function(View){

    function setAttr(view){
      return function(name, val){
        view.set(name, val);
      }
    }

    View.on('created', function(view){
      view._boundSet = setAttr(view);
      store.on('change', view._boundSet);
    });

    View.on('destroying', function(view){
      store.off('change', view._boundSet);
    });

  }
}

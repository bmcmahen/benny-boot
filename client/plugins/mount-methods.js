module.exports = mountMethods;

/**
 * @ripple plugin
 * Calls 'didMount && willUnmount' if available
 */

function mountMethods(){

  return function(View){

    View.on('mounted', function(view){
      if (view.didMount) view.didMount.call(view)
    });
    
    View.on('destroying', function(view){
      if (view.willUnmount) view.willUnmount.call(view);
    });

  }
}
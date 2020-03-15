class Bus {
  constructor(){
    this.callbacks = {}
  }
  $on(name, fn){
    this.callbacks[name] = fn;
  }
  $emit(name, arg){
    const fn = this.callbacks[name];
    if (fn && typeof fn === 'function') {
      fn(arg);
    }
  }
}
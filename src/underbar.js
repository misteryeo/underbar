(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
   if (n === undefined) {
      return array[array.length-1];
    } else if (n > array.length) {
      return array;
    } else {
      return array.slice(array.length-n, array.length);
    }
  };





  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
_.each = function(collection, iterator) {
  if (Array.isArray(collection)) {
    for (var key = 0; key < collection.length; key++){
        iterator(collection[key], key, collection);
      }
  } else {
    for (var objKey in collection){
      iterator(collection[objKey], objKey, collection);
    }
  }
};

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  /*

  // This is the original function but have refactored using _.reduce.
  _.filter = function(collection, test) {
    var result = [];

    _.each(collection, function(item){
      if (test(item)) {
        result.push(item);
      }
    });
    return result;
  }
  */

  _.filter = function(collection, test) {

    return _.reduce(collection, function(result, item){
            if (test(item)) {
              result.push(item);
            }
            return result;
           }, []);
  }



  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var result = [];

    _.filter(collection, function(item) {
      if (!test(item)) {
        result.push(item);
      }
    });

    return result;
  };

  // Produce a duplicate-free version of the array.

  _.uniq = function(array) {
    var result = [];
    var wasFound;

    _.each(array, function(arrayItem){
      wasFound = _.indexOf(result, arrayItem);
      if (wasFound === -1) {
        result.push(arrayItem);
      }
    });
    return result;
  };



  // Return the results of applying an iterator to each element.
 /*
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
      var result = [];

     _.each(collection, function (item) {
      result.push(iterator(item));
     });

     return result;
  };
  */

 _.map = function(collection, iterator) {

  return _.reduce(collection, function(result, item){
          result.push(iterator(item));
            return result;
         }, []);

 };



  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.


     _.reduce = function(collection, iterator, accumulator) {

         if (arguments.length === 2) {
           accumulator = _.first(collection);
           collection = _.last(collection,collection.length-1);
         }
           _.each(collection, function(item){
            accumulator = iterator(accumulator,item);
           });


      return accumulator;

    };


  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || _.identity;
    if (collection.length === 0) {
      return true;
    }

    return _.reduce(collection, function(status, item){
     if(status === false) {
      return false;
     }
      return !!(iterator(item));

    }, status);
  }


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  /*
  _.some = function(collection, iterator) {

    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity
      if (collection.length === 0) {
        return false;
      }
    return _.reduce(collection, function(wasFound, item){
      if (iterator(item)) {
        return true
      }
      return wasFound;
    }, false);

  };
  */

  /*   _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity;
    return Boolean(_.reduce(collection, function(memo, item) {
      return memo || iterator(item);
    }, false))
};
  */


  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    iterator = iterator || _.identity
    return !_.every(collection, function(item){
      return !iterator(item); // If not every item if false, then some will be true
    });
  };



/*
  _.some = function(collection, iterator) {
    return _.every(collection, function(item) {

    })
  }
  */
  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    _.each(arguments, function(source) {
      for (var key in source) {
        obj[key] = source[key];
      }
    });
      return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj


// Pass in existing object
// Pass in new set of object keys and values as arguments
// Loop through the keys within the existing source object
// Check if keys in existing object match with source object
// If not, assign source object keys to a new object key and value
// Return new object

  _.defaults = function(obj) {
    _.each(arguments, function(source) {
      for (var key in source) {
        if (key in source !== key in obj) {
          obj[key] = source[key];
        }
      }
    });
      return obj;
  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // information from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.

  _.memoize = function(func) {
    var result = {};

    return function() {
      // will check if it has already computed the result for the given argument
      var arg = Array.prototype.join.call(arguments,''); // Don't know why the underscore works??
      if (result[arg] === undefined) {
        result[arg] = func.apply(this, arguments);
      }
      return result[arg];
    };
  };




  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms

  _.delay = function(func, wait) {
    var arg = Array.prototype.slice.call(arguments, 2);
  setTimeout(function(){ // Do we need to return this and the next line? NO
    func.apply(this, arg);
  }, wait);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice

  _.shuffle = function(array) {
    var newArr = array.slice();
      for (var i=array.length-1; i>=0; i--) {
       var rand = Math.round(Math.random() * i);
       var temp = newArr[rand];
       newArr[rand] = newArr[i];
       newArr[i] = temp;
  }
  return newArr;
  };




  /**
   * ADVANCED
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
  **/
  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete th

  _.invoke = function(collection, functionOrKey, argse) {
    // loop through the elements in the collection
    // apply functionOrKey to these elements
    // if there are any optional arguments passed through, apply them to functionOrKey

    return _.map(collection, function(item) {
      var result; // Originally didn't have a variable declared
      if(typeof functionOrKey === 'string') { // could we have checked for 'function'
        result = item[functionOrKey];
      }
      else {
        result = functionOrKey;
      }
      return result.apply(item, argse); // Why do we need to use 'item' and not use 'this'
      // Originally had this outside of the _.map function
    });

  };


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {

   if (typeof iterator === 'function') {
    // Call sort method on collection
    return collection.sort(function(a,b){
      return iterator(a) - iterator(b);
    });
   } else {
    // Invoke sortBy property
    return collection.sort(function(a,b){
      return a[iterator] - b[iterator];
    });
   }
};

/*
  _.each(collection, function(item) {
    return item.iterator;
  });
*/

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    // Iterate through arguments to identify the longest array OR use sort
    var max = 0;
    var result = [];
    for(var i=0; i < arguments.length; i++) { // Identifies the longest array available in 'arguments'
      if (max < arguments[i].length) {
        max = arguments[i].length;
      }
    }
    for(var j=0; j < max; j++) { // Looping through indices of the longest array identified
      result.push([]); // Creates new arrays for each new index
      for (var k = 0; k < arguments.length; k++) { // Looping through arrays within 'arguments'
        result[j].push(arguments[k][j]);
      }
    }
    return result;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    return _.reduce(nestedArray, function(accumulator, item) {
      if(Array.isArray(item)) {
        return accumulator.concat(_.flatten(item));
      } else {
        return accumulator.concat(item);
      }
    }, []);

  };


/*
  _.flatten = function(nestedArray, result) {
    return _.reduce(nestedArray, function(accumulator, item) {
      if(Array.isArray(item)) {
        accumulator.concat(item);
      } else {
        return accumulator.concat([item]);
      }
    }, []);

  };
*/
// [ 1, [2], [3, [[[4]]]]] ]


  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  /*_.intersection = function () {
    var max = 0;
    for(var i=0; i < arguments.length; i++) { // Identifies the longest array available in 'arguments'
      if (max.length < arguments[i].length) {
        max = arguments[i];
      }
    }
var inEvery = _.every(array, function (item) {
  if

});

  }
  */
  _.intersection = function () {
    var max = [];
    var args = Array.prototype.slice.call(arguments);
    var result = [];

    //first get the longest length args[i] and store it in max // we just need a benchmark array, it doesn't have to be the longest
    for (var i=0; i<args.length; i++) {
      if (max.length < args[i].length) {
        max = args[i];
      }
    }

    _.each(max, function(item) { //iterates through longest args[i]
      var count = 0;

      for (var i=0; i<args.length; i++) { //iterates through all args
        _.each(args[i], function(value) { //iterates through contents of each arg
          if (item === value) {
            count++;
          }
        });
      }

      if(count === args.length) { // counted that value in every args[i]
        result.push(item);
      }
    });

    return result;
}



  /*
  _.intersection = function() {
    var result = [];
    var arg = Array.prototype.slice.call(arguments);
    for (var i=0; i < arg.length; i++) {
    _.each(arg[i], function(item){
      if (arg[i] === item) {
        result.push(item);
      }
    });
    }
      return result;
  };
*/
  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  /*_.difference = function(array) {
    // Establish empty results array
    var result = [];
    // Make arguments an array
    var args = Array.prototype.slice.call(arguments);

    _.each(args[0], function(item) {  // Loop through passed in array as a benchmark
      var isShared = true;
       for (var i=1; i < args.length; i++) { // Loop through arguments to access other arrays passed in
        _.each(args[i], function(value) { // Loop through elements in each other array passed in
          if (item !== value) { // Set conditional to check if element in array does not exist in the other arrays passed through
            isShared = false;
          }

        });

      }
      if(!isShared) {
      result.push(item);  // If this returns true, push to results array
      }

    });
    return result; // Return result
  };*/

  _.difference = function(array) {
    var args = Array.prototype.slice.call(arguments, 1);
    var otherArr = _.flatten(args);
    return _.filter(array, function(item){
      return !_.contains(otherArr, item);
    });
  };




// filter check !contains

/*
  _.difference = function(array) {
    // Establish empty results array
    var result = [];
    // Make arguments an array
    var args = Array.prototype.slice.call(arguments);

    _.each(array[0], function(item) {  // Loop through passed in array as a benchmark
       for (var i=0; i<args.length; i++) { // Loop through arguments to access other arrays passed in
        _.each(args[i], function(value) { // Loop through elements in each other array passed in
          if (item !== value) { // Set conditional to check if element in array does not exist in the other arrays passed through
            result.push(item);  // If this returns true, push to results array
          }

        });

      }

    });
    return result; // Return result
  };
*/


  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {

  };



}());
































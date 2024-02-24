setTimeout(() => {
    console.log('setTimeout start'); // 输出：setTimeout start - 被放入宏任务队列
  
    new Promise((resolve) => {
      console.log('promise1 start'); // 输出：promise1 start - 同步任务
      resolve();
    }).then(() => {
      console.log('promise1 end'); // 输出：promise1 end - 微任务
    });
  
    console.log('setTimeout end'); // 输出：setTimeout end - 同步任务
  }, 0);
  
  function promise2() {
    return new Promise((resolve) => {
      console.log('promise2'); // 输出：promise2 - 同步任务
      resolve();
    });
  }
  
  async function async1() {
    console.log('async1 start'); // 输出：async1 start - 同步任务
    await promise2(); // 遇到 await 关键字，开始执行 promise2，await后面的代码会被放入微任务队列中
    console.log('async1 end'); // 输出：async1 end - 微任务
  }
  
  async1(); // 执行 async1 函数
  console.log('script end'); // 输出：script end - 同步任务
  /**根据以上代码解析，最终的输出顺序为：

"async1 start"
"promise2"
"script end"
"promise1 start"
"setTimeout start"
"setTimeout end"
"promise1 end"
"async1 end" */
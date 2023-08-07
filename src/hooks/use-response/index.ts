

export function useResponse() {

  function failRes(code: number, msg: '失败') {
    return {
      code,
      msg
    };
  }

  function successRes(data: any) {
    return {
      code: 0,
      data
    };
  }

  return {
    failRes,
    successRes,
  }
}
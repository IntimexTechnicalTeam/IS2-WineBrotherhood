import Map from '@/sdk/common/ReflexMap';
/**
   * @description proxy是代理，重新修饰改接口，使其返回你希望返回的数据类型(若不传入Types则表示你希望代理什么都别做，把result.data返回)
   * @param Types:function 当Types时构造函数，后台返回的数据是List时，代理会返回Type[]数据类型，但后台返回数据是object时，代理会转化返回Type。
   * @param Types:object 当Types为object时，如：{ name: '' } 则返回 { name: result.data.name }
   * @param Types:[Type] 当Types为[Tpye]时，如：[Product] 则返回 Product[]
   * @param Types:...Types 当Types为数量不定时，则会按照Types所提供的类型列表进行返回一个包含Types所有类型的对象。如只需要单个属性，请传入string类型
   * @eg 例子:proxy(Product, 'Images') 返回：{Product: Product, Images: Array(5)}//此处刚好Images是一个数组
   */
export default function Proxy (...Types) {
  if (Types.length <= 0) {
    return function (target, name, descriptor) {
      let Target = target.constructor.getInstance();
      let oldValue = descriptor.value;
      descriptor.value = async function (...params) {
        let result = await oldValue.apply(Target, params);
        return result.data;
      };
    };
  } else {
    return function (target, name, descriptor) {
      let Target = target.constructor.getInstance();
      let oldValue = descriptor.value;
      descriptor.value = async function (...params) {
        let result = await oldValue.apply(Target, params);
        let resultListDifferentType = {};
        Types.forEach((Element, index) => {
          let resultData;
          let CurrentName = Element.replace('[', '').replace(']', '');
          let Current = Map[CurrentName];
          if (isArray(Element)) {
            // let Element = Map[Element.replace('[', '').replace(']', '')]
            let resultList = [''];
            resultList.length = 0;
            if (Array.isArray(result.Data) || Array.isArray(result) || Array.isArray(((result.ReturnValue && result.ReturnValue.Data) ? result.ReturnValue.Data : undefined))) {
              (result.Data || ((result.ReturnValue && result.ReturnValue.Data) ? result.ReturnValue.Data : undefined) || result).forEach((e) => {
                let resultD = new Current();
                Object.keys(resultD).forEach((element) => {
                  element = element.replace('_', '');
                  resultD[element] = e[element];
                });
                resultList.push(resultD);
              });
            } else {
              let resultD = new Current();
              Object.keys(resultD).forEach((element) => {
                element = element.replace('_', '');
                resultD[element] = result[element];
              });
              resultList.push(resultD);
            }
            resultListDifferentType[CurrentName] = resultList;
          } else if (!isArray(Element) && ArgumentType(Element) === 'object') {
            resultData = JSON.parse(Element);
            Object.keys(resultData).forEach((element) => {
              element = element.replace('_', '');
              resultData[element] = result[element];
            });
            resultListDifferentType['object' + index] = resultData;
          } else if (ArgumentType(Element) === 'function') {
            resultData = new Current();
            Object.keys(resultData).forEach((element) => {
              element = element.replace('_', '');
              resultData[element] = (result.ReturnValue || result)[element];
            });
            resultListDifferentType[CurrentName] = resultData;
          } else if (ArgumentType(Element) === 'string') {
            resultListDifferentType[Element] = (result.ReturnValue || result)[Element];
          }
        });
        return resultListDifferentType;
      };
    };
  }
}
/**
 * @deprecated ProxyV2 V2功能基本与原先代理基本无异，只是，V2只能重新修饰一个Generator，而且，Generator第一个产出（yeild）必须为异步接口的结果（promise），第二个产出必须为
 * 校检Succeed的结果，并根据Succeed的结果应当返回一个处于reject状态或者resolve状态的promise对象。最后应当产出一个你再次处理的data。
 * @param Types 参数与 原先Proxy一致
 */
export function ProxyV2 (...Types) {
  return function name (target, name, descriptor) {
    let oldValue = descriptor.value;
    if (!(oldValue.constructor.name === 'GeneratorFunction')) throw new Error('ProxyV2 Error: V2 only can descript a GeneratorFunction. at ' + oldValue.name);
    descriptor.value = async function name () {
      let Target = target.constructor.getInstance();
      let iterator = oldValue.apply(Target, Types);
      let httpResult = await iterator.next().value;
      let validateResult = await iterator.next(httpResult).value;
      let afterFormat = format(Types, validateResult);
      let result = await iterator.next(afterFormat).value;
      return result;
    };
    return descriptor;
  };
}
function format (Types, data) {
  let result = data;
  let resultListDifferentType = {};
  Types.forEach((Element, index) => {
    let resultData;
    if (Array.isArray(Element)) {
      let resultList = [Element];
      resultList.length = 0;
      if (Array.isArray(result.Data) || Array.isArray(result)) {
        (result.Data || result).forEach((e) => {
          let resultD = new Element[0]();
          Object.keys(resultD).forEach((element) => {
            element = element.replace('_', '');
            resultD[element] = e[element];
          });
          resultList.push(resultD);
        });
      } else {
        let resultD = new Element[0]();
        Object.keys(resultD).forEach((element) => {
          element = element.replace('_', '');
          resultD[element] = result[element];
        });
        resultList.push(resultD);
      }
      resultListDifferentType[Element[0].name] = resultList;
    } else if (!Array.isArray(Element) && typeof Element === 'object') {
      resultData = Element;
      Object.keys(resultData).forEach((element) => {
        element = element.replace('_', '');
        resultData[element] = result[element];
      });
      resultListDifferentType[Element.name ? Element.name : 'object' + index] = resultData;
    } else if (typeof Element === 'function') {
      resultData = new Element();
      Object.keys(resultData).forEach((element) => {
        // eslint-disable-next-line no-proto
        if (typeof resultData[element] === 'object') console.log(resultData[element].__proto__.constructor);
        element = element.replace('_', '');
        resultData[element] = result[element];
      });
      resultListDifferentType[Element.name ? Element.name : 'object' + index] = resultData;
    } else if (typeof Element === 'string') {
      resultListDifferentType[Element] = result[Element];
    }
  });
  return resultListDifferentType;
}
function isArray (src:string) {
  return src.match(/\[\w+\]/);
}
function ArgumentType (src:string) {
  if (src.match(/\[\w+\]/)) { return 'Array'; } else if (Map[src]) { return 'function'; }
  try {
    JSON.parse(src);
  } catch (e) {
    // console.log(e);
    return 'string';
  }
  return 'object';
}
// else if (Types.length === 1) {
//   let Type = Types[0];
//   if (Array.isArray(Type)) {
//     return function (target, name, descriptor) {
//       let Target = target.constructor.getInstance();
//       let oldValue = descriptor.value;
//       descriptor.value = async function (...params) {
//         let result = await oldValue.apply(Target, params);
//         let resultList = [Type];
//         resultList.length = 0;
//         if (Array.isArray(result.Data) || Array.isArray(result)) {
//           (result.Data || result).forEach((e) => {
//             let resultData = new Type[0]();
//             Object.keys(resultData).forEach((element) => {
//               element = element.replace('_', '');
//               resultData[element] = e[element];
//             });
//             resultList.push(resultData);
//           });
//         } else {
//           let resultData = new Type[0]();
//           Object.keys(resultData).forEach((element) => {
//             element = element.replace('_', '');
//             resultData[element] = result[element];
//           });
//           resultList.push(resultData);
//         }
//         return resultList;
//       };
//     };
//   } else if (typeof Type === 'function') {
//     return function (target, name, descriptor) {
//       let Target = target.constructor.getInstance();
//       let oldValue = descriptor.value;
//       descriptor.value = async function (...params) {
//         let result = await oldValue.apply(Target, params);
//         let resultData = new Type();
//         Object.keys(resultData).forEach((element) => {
//           element = element.replace('_', '');
//           resultData[element] = result[element];
//         });
//         return resultData;
//       };
//     };
//   } else if (!Array.isArray(Type) && typeof Type === 'object') {
//     return function (target, name, descriptor) {
//       let Target = target.constructor.getInstance();
//       let oldValue = descriptor.value;
//       descriptor.value = async function (...params) {
//         let resultData = Type;
//         let result = await oldValue.apply(Target, params);
//         Object.keys(resultData).forEach((element) => {
//           resultData[element] = result[element];
//         });
//         return resultData;
//       };
//     };
//   } else {
//     return function (target, name, descriptor) {
//       let Target = target.constructor.getInstance();
//       let oldValue = descriptor.value;
//       descriptor.value = async function (...params) {
//         let result = await oldValue.apply(Target, params);
//         return result;
//       };
//     };
//   }
// }

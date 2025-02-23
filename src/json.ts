// JSON qanday ishlashini ko'rish nodejsdagi.+

// const toString = (data: any) => {
//     if (typeof data === 'object') {
//         let jsString = '{';
//         let keys = Object.keys(data);

//         keys.forEach((key, index) => {
//             jsString += '"' + key + '":"' + data[key] + '"';
//             if (index < key.length - 1) {
//                 jsString += ",";
//             }
//             jsString += '\n';
//         })
//         jsString += "}";
//         return jsString;
//     }
//     else if (typeof data === 'string') return data;
//     else if (typeof data === 'bigint' || typeof data === 'number' || typeof data === "boolean") return data.toString();
// }

// why => RangeError: Maximum call stack size exceeded
// function foo(a: number) {
//     let sum = 0;
//     function recursive(b: number): number {
//       return a + recursive(b);
//     }

//     recursive(a);

//     return foo;
//   }

//   console.log(foo(2)(2)(3)(4)(5)(7));

// const middlewares: Middleware[] = [];

// export function use(middleware: Middleware) {
//   middlewares.push(middleware);
// }

// function mainHandler() {
//     try {
//         let index = 0;
//         function next() {
//             if (index < middlewares.length) {
//                 const middleware = middlewares[index++];
//                 middleware(req, res, next);
//             }
//         }

//         next();
//     } catch (error) {

//     }
// }

// masalan menda bir og'ir vazifali api bor unga so'rov
// kelganda uni kutib qoladi lekin agar browserda bo'lsa
// tab yopilsa jam o'sha jarayonlar boshqa apilarga tasir
// qilayabdi

// Global object yaratdim lekin u doim global holatda bor
// lekin menga ma'lum contextda yaratilishi kerak u doim ham loyihada osilib turishi kerak emas
// M: const handlers: Record<string, Handler> = {};

// tasavvur qiling sizda bitta global bor siz yana bir xuddi shunaqa object yaratmoqchisiz
// nima qilasiz ? Faqat classdan foydalanmasdan qilish kerak.

// export function createRouter() {
//  const routes: Record<string, Handler> = {};
//  return routes;
// } bunaqa yo'l bilan object yaratish bilan class orqali yaratishning nima farqlari bor ?

// export function CreateRouter() {
//     const routes: Record<string, Handler> = {};
//     return routes;
//   } shu holatda object yaratish bilan uning ichida this ishlatishning nima farqlari bor ?

// typescriptda oddiy function bilan constructor yarata olmayabman
// strict mode da

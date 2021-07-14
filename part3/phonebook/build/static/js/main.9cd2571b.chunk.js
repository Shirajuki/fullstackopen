(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var r=t(16),c=t.n(r),o=t(17),a=t(3),u=t(2),s=t(5),i=t.n(s),l="/api/persons",d={getAll:function(){return i.a.get(l)},create:function(e){return i.a.post(l,e)},update:function(e,n){return i.a.put("".concat(l,"/").concat(e),n)},deleteEntry:function(e){return i.a.delete("".concat(l,"/").concat(e))}},b=t(0),j=function(e){var n=e.person,t=e.deletePerson;return Object(b.jsxs)("p",{children:[n.name," ",n.number,Object(b.jsx)("button",{onClick:function(){return t(n.id,n.name)},children:"delete"})]})},m=function(e){var n=e.persons,t=e.filter,r=e.deletePerson;return n.filter((function(e){return e.name.toLowerCase().includes(t)})).map((function(e){return Object(b.jsx)(j,{person:e,deletePerson:r},e.name)}))},f=function(e){var n=e.onSubmit,t=e.newName,r=e.newNumber,c=e.setNewName,o=e.setNewNumber;return Object(b.jsxs)("form",{onSubmit:n,children:[Object(b.jsxs)("div",{children:["name:"," ",Object(b.jsx)("input",{id:"name",value:t,onChange:function(e){return c(e.target.value)}})]}),Object(b.jsxs)("div",{children:["number:"," ",Object(b.jsx)("input",{id:"number",value:r,onChange:function(e){return o(e.target.value)}})]}),Object(b.jsx)("div",{children:Object(b.jsx)("button",{type:"submit",children:"add"})})]})},h=function(e){var n=e.value,t=e.setValue;return Object(b.jsxs)("div",{children:["filter shown with"," ",Object(b.jsx)("input",{id:"filter",value:n,onChange:function(e){return t(e.target.value.toLowerCase())}})]})},p=function(e){var n=e.error;return""===(null===n||void 0===n?void 0:n.message)||void 0===(null===n||void 0===n?void 0:n.message)?Object(b.jsx)(b.Fragment,{}):Object(b.jsx)("div",{className:"error"===(null===n||void 0===n?void 0:n.type)?"error":"success",children:null===n||void 0===n?void 0:n.message})},v=(t(41),function(){var e=Object(u.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(u.useState)(""),s=Object(a.a)(c,2),i=s[0],l=s[1],j=Object(u.useState)(""),v=Object(a.a)(j,2),O=v[0],w=v[1],x=Object(u.useState)(""),g=Object(a.a)(x,2),y=g[0],N=g[1],S=Object(u.useState)({message:"",type:"error"}),k=Object(a.a)(S,2),T=k[0],C=k[1];Object(u.useEffect)((function(){d.getAll().then((function(e){r(e.data)}))}),[]);return Object(b.jsxs)("div",{children:[Object(b.jsx)("h2",{children:"Phonebook"}),Object(b.jsx)(p,{error:T}),Object(b.jsx)(h,{value:y,setValue:N}),Object(b.jsx)("h2",{children:"add a new"}),Object(b.jsx)(f,{onSubmit:function(e){e.preventDefault();var n=i,c=O,a={name:n,number:c};if(""===n||void 0===n)window.alert("Please input a valid name!");else if(t.map((function(e){return e.name})).includes(n)){var u=t.find((function(e){return e.name.includes(n)}));u.number!==c?window.confirm("".concat(n," is already added to phonebook, replace old number with a new one?"))&&d.update(u.id,a).then((function(e){var n=t.map((function(e){return e.id===u.id?a:e}));r(n)})).catch((function(e){C({message:"The person ".concat(n," has already been removed from the server"),type:"error"}),setTimeout((function(){C(null)}),3e3)})):window.alert("".concat(n," is already added to phonebook"))}else l(""),w(""),d.create(a).then((function(e){console.log(e),r([].concat(Object(o.a)(t),[a])),C({message:"Added ".concat(a.name),type:"success"}),setTimeout((function(){C(null)}),3e3)})).catch((function(e){C({message:e.response.data,type:"error"}),setTimeout((function(){C(null)}),3e3)}))},newName:i,setNewName:l,newNumber:O,setNewNumber:w}),Object(b.jsx)("h2",{children:"Numbers"}),Object(b.jsx)(m,{persons:t,filter:y,deletePerson:function(e,n){window.confirm("Delete ".concat(n," ?"))&&d.deleteEntry(e).then((function(c){r(t.filter((function(n){return n.id!==e}))),C({message:"Successfully deleted ".concat(n),type:"success"}),setTimeout((function(){C(null)}),3e3)})).catch((function(e){C({message:"The person ".concat(n," has already been removed from the server"),type:"error"}),setTimeout((function(){C(null)}),3e3)}))}})]})});c.a.render(Object(b.jsx)(v,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.9cd2571b.chunk.js.map
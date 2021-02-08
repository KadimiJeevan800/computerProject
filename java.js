
/*________________________________________________________________*/
function war(a)
{
 if(a in [2,3,4,5,6,7,8,9]){
   alert("Plzz enter valid data word...")
 }
 else if(a==""){
   alert("Enter the data word ")
 }
}
  
var ParityBit = function(position, dataSize) {
  this.responsibleFor = {};
  this.position = position;
  this.value = undefined;

  this.assign = function(responsibleFor) {
    this.responsibleFor = responsibleFor;
  };

  this.reCalc = function() {
    for (var key in this.responsibleFor) {
      if (this.responsibleFor.hasOwnProperty(key)) {
        // if it's in the set of 2^n, then we're looking at the value of a parity bit
        if (Math.log(key) / Math.log(2) % 1 === 0) {
          this.responsibleFor[key] = (this.responsibleFor[key] === null && this.isEven()) ? "0" : "1";

          // and finally assign the value of this ParityBit object
          if (key === this.position.toString()) {
            this.value = this.responsibleFor[key];
          }
        }
      }
    }
  };

  // iterate through each bit in responsibleFor and calculate whether the
  // bit holds an even or odd value
  this.isEven = function() {
    var count = 0;
    for (var key in this.responsibleFor) {
      if (this.responsibleFor.hasOwnProperty(key)) {
        count += (this.responsibleFor[key] !== null) ? parseInt(this.responsibleFor[key]) : 0;
      }
    }
    return count % 2 === 0;
  };

  this.toString = function() {
    return this.value;
  };
}

var generate = function(input) {
  var r = 0;

  // calculate how many parity bits we need: m+r+1 <= 2^r
  while (!(input.length + r + 1 <= Math.pow(2, r))) {
    r++;
  }

  var dataSequence = {};
  var binaryArray = []; // used to create the 000, 001, 010, 011, ... table
  var arrayLength = input.length + r;
  var inputIndexPointer = 0;

  for (var i = 1; i <= arrayLength; i++) {
    // if it's a power of 2, push an empty location that will be filled later
    if ((Math.log(i) / Math.log(2)) % 1 === 0) {
      dataSequence[i] = new ParityBit(i);
    } else {
      dataSequence[i] = input.charAt(inputIndexPointer);
      inputIndexPointer++;
    }

    var binary = i.toString(2); // now generate the value for our binary table
    binary = "0000000000000000" + binary; // add leading zeros ...
    binary = binary.slice(-1 * (r)); // ... and cut the string back down to size
    binaryArray.push(binary);
  }

  // assign "responsibleFor" bits to all the parity bits, and then assign each
  // parity bit a value to match the even or odd mode. this is only the first pass
  for (var j = 0; j < r; j++) {
    // get position of parity bit
    var position = Math.pow(2, j);

    var responsibleFor = {};

    for (var k = 1; k <= arrayLength; k++) {
      if (binaryArray[k-1].charAt(r-1-j) === "1") {
        // assign key and value
        responsibleFor[k] = (dataSequence[k] instanceof ParityBit) ? null : dataSequence[k];
      }
    }

    dataSequence[position].assign(responsibleFor);
  }

  // do second pass to add in values for all the nulls
  for (var j = 0; j < r; j++) {
    // get parity bit
    var current = dataSequence[Math.pow(2, j)];
    current.reCalc();
  }

  var dataString = '';
  for (var key in dataSequence) {
    dataString += dataSequence[key].toString();
  }
 // console.log(dataSequence)
  return dataString;
};



/*________________________________________________________________*/
var even=()=>{
    var a=document.getElementById("n").value;
       war(a);
    var out=generate(a);
/*var fact=1
for (var i = 1; i <= l; i++) {
    fact = fact * i;
}
*/
var c = document.createElement("p");
var d = document.createTextNode(">> Hamming code for given Data Word ["+a + "] even Check is $ "+ out);
c.append(d);
var e = document.getElementById("s");
e.appendChild(c);

}

/*-------------------------------------------------------------------------------------------------------------------------*/
var odd=()=>{
    var a=document.getElementById("n").value;
  var g=generate(a);
 f=[]
 function find(str){
   res=[]
  i=1

   while(i<str.length){
     if((Math.log(i) / Math.log(2)) % 1 === 0){
       console.log(i)
        if(str[i]==0){
          res.push(1)
          //console.log(res[i]);
        }
        else{
          res.push(0)
        }
      }  
    else{
      console.log(i)
      res.push(str[i])
    }
    i=i+1 
   }
   return res;
   }
 for (i=0;i<g.length;i++){
   f[i+1]=g[i];
 }
 var st=find(f)
    console.log()
    var c = document.createElement("p");
    var d = document.createTextNode(">> Hamming code for given Data word ["+a+ "] odd check is $ "+st);
    c.append(d);
    var e = document.getElementById("s");
    e.appendChild(c);
    }



/*---------------------------------------------------check sum code execution for given data word ------------------------------------------------------------ */
 var str1=[];
 var str2=[];
 var check=()=>{
 var inp=document.getElementById("chk").value;
 var offset=Number((inp.length)/2);
 for (var i = 0; i <inp.length; i++) {
     if(i<offset){
         str1.push(inp[i]);

     }
    else {
        str2.push(inp[i]);

    }

    
    }
     //console.log(str1+"  "+ str2);
    const addBinary = (str1, str2) => {
        let carry = 0;
        const res = [];
        const ca=[];
        i=0;
         
          while(i<offset-1)
          {
            ca.push(0);
            i=i+1;
          }
          ca.push(1);
        let l1 = str1.length, l2 = str2.length;
        for (let i = l1 - 1, j = l2 - 1; 0 <= i || 0 <= j; --i, --j) {
           let a = 0 <= i ? Number(str1[i]) : 0,
           b = 0 <= j ? Number(str2[j]) : 0;
           res.push((a + b + carry) % 2);
           carry = 1 < a + b + carry;
        };
        if (carry){
           var st=addc(res,ca);
           
return st.reverse()           //console.log(st)
        }
        else{
        return res.reverse();
        }
        
     };
     function addc(str1,str2)
     {  
   
    let carry = 0;
    const res = [];
    let l1 = str1.length, l2 = str2.length;
    for (let i = l1 - 1, j = l2 - 1; 0 <= i || 0 <= j; --i, --j) {
       let a = 0 <= i ? Number(str1[i]) : 0,
       b = 0 <= j ? Number(str2[j]) : 0;
       res.push((a + b + carry) % 2);
       carry = 1 < a + b + carry;
    };
          
          if(carry){
            console.log(res," *(** ",str2);
            addc(res,str2);
          }
         else{ //console.log(res)
          return res;
        }
     }


var str3=addBinary(str1,str2);
function comp(str){
  res=[]
  
  for (i=0;i<str.length;i++){
    if(str[i]==0){
     
      res.push(1)
    }
    else{
     
      res.push(0)
    }
  }
  console.log(res)
  return res
}
out=comp(str3);

var c = document.createElement("p");
    var d = document.createTextNode(">> CheckSum Number  of given Data word ["+ inp+"] is $$ "+out);
    c.append(d);
    var e = document.getElementById("s");
    e.appendChild(c);
    str1=[]
    str2=[]

}
    
    
    
    



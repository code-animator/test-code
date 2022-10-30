/*
Solution 1:
Pre-processing steps:
    1) Remove overlaps from existing input.
    2) Create a new array of objects similar to sampleInput, but without oerlaps.
 */

const { exit } = require('process');
const { clearInterval } = require('timers');
//Uncomment the next line to test with the given JSON file
//const sampleInput = require('./in/sampleInputBig2.json');
//const pre=process.cpuUsage();

const sampleInput = [
    {
    key: [1, 4],
    val: 'red'
    },
    {
    key: [1, 4],
    val: 'green'
    },
    {
    key: [-2, -1],
    val: 'green'
    },
    {
    key: [2, 40],
    val: 'blue'
    },
    {
        key: [-2, -1],
        val: 'green'
    },
    {
    key: [-20, -10],
    val: 'cyan'
    },
    {
        key: [1, 4],
        val: 'green'
    },
    {
    key: [-50, -30],
    val: 'grey'
    }
    ];
    
    //The original function
    function makeQuery(input) {
    return key => input.find(function (item) {
        return item.key[0]<=key && key<item.key[1];
        //return item;
    })?.val;
    }

    //function to check if value already exists in the preprocessed array
    function isSubset(parA, parB, parArr){
        const indFnd=parArr.findIndex(object => {
            return object.key[0] <= parA && object.key[1] >= parB;
        });
        if(indFnd==-1)
            return false;
        else
            return true;
    }

    //Function makeQry preprocesses the input and returns a find function
    function makeQry(input){
        console.time('Pre-processing time');
        //Step 1: Check and remove overlaps from all keys in the given input and create a new object same as input
        inp_len=input.length;
        let preproInp = [];
        let indElem = {};
        //let's create an array of all intervals
        for(let i=0; i<inp_len;i++)
        {
            let tmp_a = Object.entries(input[i]['key'])[0][1];
            let tmp_b = Object.entries(input[i]['key'])[1][1];
            let tmp_c = Object.values(input[i])[1];
            let tmp_d=0;
            if(i==0){
                indElem.key = [tmp_a,tmp_b];
                indElem.val = tmp_c;
                preproInp.push(indElem);
                indElem={};
            }else{
                flgSubset = isSubset(tmp_a, tmp_b, preproInp);
                if(!flgSubset){
                    indElem.key = [tmp_a,tmp_b];
                    indElem.val = tmp_c;
                    preproInp.push(indElem);
                    indElem={};
                }
            }
            //output=sampleInput.splice(indexOfObject, 1);
        }
        //Step 1: End
        console.log("Length of new arr:", preproInp.length);
        //Step 2: Sort the new array of objects
        //removing this step as this would change the output when compared to the original query function
        //preproInp.sort((a,b)=>(a.key[0] === b.key[0]  ? b.key[1] - a.key[1] : a.key[0] - b.key[0]));
        console.timeEnd('Pre-processing time');
        //Step 2: End
        //Step 3: Return function
        return key => preproInp.find(function (item) {
            return item.key[0]<=key && key<item.key[1];
        })?.val;
        //Step3: End
    }
    //console.log("Length of og arr", sampleInput.length);
    op1=makeQuery(sampleInput);
    op=makeQry(sampleInput);
    console.time('OG Query Response time');
    console.log(op1(5));
    console.timeEnd('OG Query Response time');
    console.time('Query Response time');
    console.log(op(5));
    console.timeEnd('Query Response time');
    /*let arrChk = [20,-1100, 92274688, 68157440, -100, 56, -80740352, 91, 11, 1, 2001, 'a'];
    let i=0;
    var interval=setInterval(function(){
            if(i<=arrChk.length-1){
                console.time('Invoke Call'+i);
                console.log(op(arrChk[i]));
                console.timeEnd('Invoke Call'+(i));
                console.time('OG Invoke Call'+i);
                console.log(op1(arrChk[i]));
                console.timeEnd('OG Invoke Call'+(i));
                i++;
            }
            else{
                clearInterval(interval);
            }
    },100);*/
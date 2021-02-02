import firebase from './firebase'

const setCategory=(obj)=>{
    return({type:"CATEGORY_CHANGE",payLoad:[...obj]})
}

export const getCategories=()=>{
    return((dispatch)=>{
        firebase.firestore().collection("Category").where("companyid","==",localStorage.getItem("company_id")).onSnapshot((querysnap)=>{
            let temp=[]
            querysnap.forEach((ele)=>{
                temp.push({...ele.data(),id:ele.id})
            })
            dispatch(setCategory([...temp]))
        })
    })
}
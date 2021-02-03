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

const setMeals=(obj)=>{
    return({
        type:"SET_MEALS",
        payLoad:[...obj]
    })
}
export const getMeals=()=>{
    return((dispatch)=>{
        firebase.firestore().collection("Meals").where("companyid","==",localStorage.getItem("company_id")).onSnapshot((querysnap)=>{
            let temp=[]
            querysnap.forEach((ele)=>{
                temp.push({...ele.data(),id:ele.id})
            })
            dispatch(setMeals([...temp]))
        })
    })
}
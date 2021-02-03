const initialState={
    category:[],
    meals:[]
}
const Reducer=(state=initialState,Action)=>{
    switch (Action.type) {
        case "CATEGORY_CHANGE":
            return({...state,category:[...Action.payLoad]})
        case "SET_MEALS":
            return({...state,meals:[...Action.payLoad]})
    
    }
    return state
}

export default Reducer
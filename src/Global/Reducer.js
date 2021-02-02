const initialState={
    category:[]
}
const Reducer=(state=initialState,Action)=>{
    switch (Action.type) {
        case "CATEGORY_CHANGE":
            return({...state,category:[...Action.payLoad]})
    
    }
    return state
}

export default Reducer
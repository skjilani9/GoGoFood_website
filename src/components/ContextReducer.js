import React, { createContext, useContext, useReducer } from "react";

const Cartstatecontext = createContext();
const CartDispatchcontext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, price: action.price, quty: action.quty, siz: action.siz, img: action.img }]
        case "REMOVE":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr;
        case "DROP":
            let emptyarr = []
            return emptyarr
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    // console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, quty: parseInt(action.quty) + food.quty, price: action.price + food.price }
                }
                return arr
            })
            return arr

        default:
            console.log("error")
    }
}

export const CartProvide = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchcontext.Provider value={dispatch}>
            <Cartstatecontext.Provider value={state}>
                {children}
            </Cartstatecontext.Provider>
        </ CartDispatchcontext.Provider>
    )
}


export const useCart = () => useContext(Cartstatecontext)
export const useDispatchCart = () => useContext(CartDispatchcontext)
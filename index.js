Object.defineProperties(Array.prototype, {
    count: {
        value: function(value) {
            return this.filter(x => x==value).length;
        }
    }
});


let board = [[0,0,0],[0,0,0],[0,0,0]]

let sum = 0;

let O = `<svg width="75px" height="75px" viewBox="0 0 24 24" fill="purple" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>`

let X =  `<svg viewBox="0 0 24 24" fill="purple" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F"></path> </g></svg>`

let all_buttons = document.querySelectorAll(".xobtn")


function getCords(pos){
    return [Math.floor(pos/3),pos%3]
}


function clearBoard(){
    


    all_buttons.forEach(btn=>{
        btn.innerHTML = ``
    })

    board = board.map((ar)=>ar.map((x)=>0))


    return
}


function checkWinorLost(cords){

    sum = 0;

    for(let j=0;j<3;j++){
        sum+=board[cords[0]][j]
    }

    if(sum === 3 || sum === -3){
        console.log("Someone won")
        clearBoard()
        return
    }


    sum = 0;

    for(let j=0;j<3;j++){
        sum+=board[j][cords[1]]
    }
    if(sum === 3 || sum === -3){
        console.log("Someone won")
        clearBoard()
        return
    }

    //Sum of diags
    sum = 0;

    for(let i =0;i<3;i++){
        sum += board[i][i]
    }
    if(sum === 3 || sum === -3){
        console.log("Someone won")
        clearBoard()
        return
    }

    sum = 0;

    for(let i=2;i>=0;i--){
        sum += board[i][2-i];
    }

    if(sum === 3 || sum === -3){
        console.log("Someone won")
        clearBoard()
        return
    }

    let count=0;

    for(i=0;i<3;i++){
        count += board[i].count(0)
    }

    if(count === 0){
        console.log("draw")
        clearBoard()
        return
    }

}



let turn = 'x'

all_buttons.forEach(btn =>{

    btn.addEventListener('click',()=>{
        
        let pos = parseInt(btn.classList[1])
        let cords = getCords(pos)

        if(turn === 'x' && !board[cords[0]][cords[1]]) {
            btn.innerHTML = X
            board[cords[0]][cords[1]] = 1;
            turn = 'o'

            checkWinorLost(cords);
        }
        else if(turn === 'o' && !board[cords[0]][cords[1]]){
            btn.innerHTML = O
            board[cords[0]][cords[1]] = -1;
            turn = 'x'

            checkWinorLost(cords);
        }

    })
})




$(document).ready(function(){

  var bombs = 0;
  var testMode = false; // set to true to see where the mines are marked by M
  var clearSquares = 0;
  var tileCounter = 0;
  
  function updateBombs(){
      $("#bombs").text(bombs);
  }

  function updateCounter(){
    $("#tiles").text(tileCounter);
  }

  function generateGrid(height, width) {
    var grid = document.getElementById("grid");
    grid.innerHTML = "";

    for (var i = 0; i < height; i++) {
      row = grid.insertRow(i);
      for (var j = 0; j < width; j++) {
        cell = row.insertCell(j);

        cell.onclick = function() { 
          clickCell(this); 
        };
        
        var mine = document.createAttribute("status");       
        mine.value = "false";             
        cell.setAttributeNode(mine);

        cell.addEventListener('contextmenu', (event) => {
          event.preventDefault();
          //rightClickCell(this);
          //I could not get it to change the innerHTML on the right click i tried everything I tried using the rightClickCell function further down and the alert works showing x when right click but does not change the cell text      
        })
      }
    }
  }

  function addMines(amount) {
    var grid = document.getElementById("grid");
    var minesCount = amount;
  
    for (var i = 0; i < minesCount; i++) {
      var randomRow = Math.floor(Math.random() * grid.rows.length);
      var randomCol = Math.floor(Math.random() * grid.rows[randomRow].cells.length);
      
      while (grid.rows[randomRow].cells[randomCol].getAttribute("status") === "true") {
        randomRow = Math.floor(Math.random() * grid.rows.length);
        randomCol = Math.floor(Math.random() * grid.rows[randomRow].cells.length);
        
      }
      grid.rows[randomRow].cells[randomCol].setAttribute("status", "true");

      // test
      if (testMode) grid.rows[randomRow].cells[randomCol].innerHTML = "M";
    }
  }

  function clickCell(cell) {
    if (cell.getAttribute("status") === "true") {
      revealAllBombs();
      playAgain();
    } else {
      var bombsCount = countAdjacentBombs(cell);
      clearSquares -= 1;
      
      if (bombsCount > 0){
        cell.innerHTML = bombsCount;
        cell.style.backgroundColor = "darkgreen";
      } else {
        cell.innerHTML = "";
        cell.style.backgroundColor = "darkgreen";
      }

      tileCounter += 1;
      updateCounter();

      if (clearSquares === 0){
        winner();
      }
    }
  }

  function rightClickCell(cell){
    cell.innerHTML = "X"
    alert(cell.innerHTML);
  }
  
  function countAdjacentBombs(cell) {
    var row = cell.parentNode.rowIndex;
    var col = cell.cellIndex;
    var bombsCount = 0;
  
    //eight possible directions to check for bombs
    var directions = [
      { row: -1, col: -1 }, { row: -1, col: 0 }, { row: -1, col: 1 },
      { row: 0, col: -1 }, /* Current Cell */ { row: 0, col: 1 },
      { row: 1, col: -1 }, { row: 1, col: 0 }, { row: 1, col: 1 }
    ];
  
    directions.forEach(function (dir) {
      var newRow = row + dir.row;
      var newCol = col + dir.col;
  
      if (newRow >= 0 && newRow < grid.rows.length && newCol >= 0 && newCol < grid.rows[newRow].cells.length) {
        if (grid.rows[newRow].cells[newCol].getAttribute("status") === "true") {
          bombsCount++;
        }
      }
    });
  
    return bombsCount;
  }

  function revealAllBombs() {
    for (var i = 0; i < grid.rows.length; i++) {
      for (var j = 0; j < grid.rows[i].cells.length; j++) {
        var cell = grid.rows[i].cells[j];
        if (cell.getAttribute("status") === "true") {
          cell.innerHTML = "💣";
        }
      }
    }
  }


  function start(){
      $("#easy").show();
      $("#medium").show();
      $("#hard").show();
      $("#diffLabel").show();
      $("#quit").hide();
      $("#gameover").hide();
      
      $("#easy").click(function() {
        generateGrid(9,9);
        addMines(10);
        bombs = 0;
        bombs += 10;
        clearSquares = 0;
        clearSquares += 71;
        updateBombs();
        $("#grid").show();
        $("#easy").hide();
        $("#medium").hide();
        $("#hard").hide();
        $("#diffLabel").hide();
        $("#quit").show();
        $("#gameover").hide();
        $("#pick").hide();
        tileCounter = 0;
        updateCounter();

        var count = 0;
      timer = setInterval(function(){
          count ++;
          $("#time").text(count);
        }, 1000);
      });

      $("#medium").click(function() {
        generateGrid(16,16);
        addMines(40);
        bombs = 0;
        bombs += 40;
        clearSquares = 0;
        clearSquares += 216;
        updateBombs();
        $("#grid").show();
        $("#easy").hide();
        $("#medium").hide();
        $("#hard").hide();
        $("#diffLabel").hide();
        $("#quit").show();
        $("#gameover").hide();
        $("#pick").hide();
        tileCounter = 0;
        updateCounter();

        var count = 0;
      timer = setInterval(function(){
          count ++;
          $("#time").text(count);
      }, 1000);
      });

      $("#hard").click(function() {
        generateGrid(22,22);
        addMines(99);
        bombs = 0;
        bombs += 99;
        clearSquares = 0;
        clearSquares += 381;
        updateBombs();
        $("#grid").show();
        $("#easy").hide();
        $("#medium").hide();
        $("#hard").hide();
        $("#diffLabel").hide();
        $("#quit").show();
        $("#gameover").hide();
        $("#pick").hide();
        tileCounter = 0;
        updateCounter();

        var count = 0;
      timer = setInterval(function(){
          count ++;
          $("#time").text(count);
      }, 1000);
      });

      $("#quit").click(function(){
          clearInterval(timer)
          playAgain();
          $("#grid").hide();
          $("bombs").text("0")
      });
            
  }

  function playAgain(){
      $("#easy").show();
      $("#medium").show();
      $("#hard").show();
      $("#diffLabel").show();
      $("#quit").hide();
      $("#gameover").text("Game Over")
      $("#gameover").show();
      $("#pick").show();
      clearInterval(timer);
  }

  function winner(){
    $("#gameover").text("You win!");
    $("#gameover").show();
    $("#diffLabel").show();
    $("#pick").show();
    $("#easy").show();
    $("#medium").show();
    $("#hard").show();
    $("#quit").hide();
    clearInterval(timer);
  }

  start();
});

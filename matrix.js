    function Load(rows,cols){
            $("#div1").empty();
            Game(rows,cols);
    }

    function create2DArray(rows){
        var array = [];
        
        for(var i=0;i<rows;i++){
            array[i] = [];
        }
        
        return array;
    }
    
    function Game(rows,cols) {
        if(rows==5){
            $('#div1').css("width","400px");
        }else if(rows==6){
            $('#div1').css("width","460px");
        }else{
            $('#div1').css("width","325px");
        }
        
        var array = create2DArray(rows);
        var num=1;

        for(var i=0;i<rows;i++){
            for(var j=0;j<cols;j++){
                array[i][j] = num++;
            }
        }

        shuffle(array);

        for(i=0,num=1;i<rows;i++){
            for(j=0;j<cols;j++){
                var $newDiv;
                if(i==rows-1 && j==cols-1)
                    $newDiv = $("<div class='dragdiv'></div>");
                else
                    $newDiv = $("<div class='dragdiv' id='btn"+ num++ +"'>"+array[i][j]+"</div>");
					
				array[i][j] = $newDiv;
                $($newDiv).on("click",{array:array,rows:rows,cols:cols},makeElementAsDragAndDrop);
                $("#div1").append($newDiv);
            }
        }
        
        function makeElementAsDragAndDrop(event){
            var array = event.data.array;
            var rows = event.data.rows;
            var cols = event.data.cols;
            
            var temp = event.target;
            
            for(var i=0;i<rows;i++){
                for(var j=0;j<cols;j++){
                    if($(temp).text()==array[i][j].text()){
                        if(i-1>=0 && array[i-1][j].text()==""){
                            array[i-1][j].text($(temp).text());
                            $(temp).text("");
                        }else if(i+1<rows && array[i+1][j].text()==""){
                            array[i+1][j].text($(temp).text());
                            $(temp).text("");
                        }else if(j-1>=0 && array[i][j-1].text()==""){
                            array[i][j-1].text($(temp).text());
                            $(temp).text("");
                        }else if(j+1<cols && array[i][j+1].text()==""){
                            array[i][j+1].text($(temp).text());
                            $(temp).text("");
                        }
                    }
                }
            }
            handle();
        }
        
        function shuffle(input){
            for(var i = input.length; i; ){
                var j = parseInt(Math.random() * i);
                var x = input[--i];
                input[i] = input[j];
                input[j]= x;
            }
        }

        function handle(){
            var count=1;
            $("#div1").children('.dragdiv').each(function(){
                if($(this).text()==count){
                    if(count==15){
                        alert('you win');
                        return;
                    }
                    count++;
                }else{
                    count=1;
                }
            });

        }
    };
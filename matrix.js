    new Game(4,4);
	
	function Load(rows,cols){
        $("#div1").empty();
        $('.dragdiv').on("click");
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
        }else if(rows==3){
            $('#div1').css("width","250px");
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
					$newDiv = $("<div class='dragdiv' id='btn"+ num++ +"'><input type='text'                                       id='txtbox' style='opacity:0;filter:alpha(opacity=0);width: 0;overflow:                                hidden;background-color:#C0C0C0;border:0px;'/></div>");
                else
                    $newDiv = $("<div class='dragdiv' id='btn"+ num++ +"'>"+array[i][j]+"</div>");
					
				array[i][j] = $newDiv;
                $($newDiv).on("click",{array:array,rows:rows,cols:cols},makeElementAsDragAndDrop);
                $("#div1").append($newDiv);
            }
        }
        
        $("#txtbox").keydown(function(event){makeElementAsKey(event);});
        $("#txtbox").focus();
        
        function makeElementAsKey(event){            
            var temp = event.target;
            var flag=false;
            
            for(var i=0;i<rows && !flag;i++){
                for(var j=0;j<cols && !flag;j++){
                    if($(temp).parent().text()==array[i][j].text()){
                        if(event.keyCode==38){
                            if(i-1>=0){
                                $(temp).parent().text(array[i-1][j].text());
                                array[i-1][j].text("");
                                array[i-1][j].append($(temp));
                                flag=true;
                            }
                        }else if(event.keyCode==37){
                            if(j-1>=0){
                                $(temp).parent().text(array[i][j-1].text());
                                array[i][j-1].text("");
                                array[i][j-1].append($(temp));
                                flag=true;
                            }
                        }else if(event.keyCode==39){
                            if(j+1<cols){
                                $(temp).parent().text(array[i][j+1].text());
                                array[i][j+1].text("");
                                array[i][j+1].append($(temp));
                                flag=true;
                            }
                        }else if(event.keyCode==40){
                            if(i+1<rows){
                                $(temp).parent().text(array[i+1][j].text());
                                array[i+1][j].text("");
                                array[i+1][j].append($(temp));
                                flag=true;
                            }
                        }else{
                            flag=true;
                        }
                    }
                }
            }
            
            if(rows==5){
                handle(24);
            }else if(rows==6){
                handle(35);
            }else if(rows==3){
                handle(8);
            }else{
                handle(15);
            }
            
            $("#txtbox").keydown(function(event){makeElementAsKey(event);});
            $("#txtbox").focus();
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
            
            if(rows==5){
                handle(24);
            }else if(rows==6){
                handle(35);
            }else if(rows==3){
                handle(8);
            }else{
                handle(15);
            }
            
        }
        
        function shuffle(input){
            for(var i = input.length-1; i; --i){
                for(var j = input[0].length-1; j; --j){
                    if(i==input.length-1 && j == input[0].length-1)
                        continue;
                    var m = parseInt(Math.random() * (i));
                    var n = parseInt(Math.random() * (j));
                    var x = input[i][j];
                    input[i][j] = input[m][n];
                    input[m][n]= x;
                }
            }
        }

        function handle(total){
            var count=1;
            var flag = true;
            
            $("#div1").children('.dragdiv').each(function(){
                if($(this).text()==count){
                    $(this).css("background-color","white");
                    if(count==total && flag){
                        alert('you win');
                        $('.dragdiv').off("click");
                        return;
                    }
                }else{
                    flag = false;
                    $(this).css("background-color","#C0C0C0");
                }
              count++;  
            });

        }
        
};
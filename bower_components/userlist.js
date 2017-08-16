/**
 * Created by lyl on 2017/6/4.
 */
$(function(){
    "use strict";
    $('.del').on('click',function(e){
        var target = $(e.target)
        var id=target.data('id');
        var tr=$('.item-id-'+id);
        $.ajax({
            type:'delete',
            url:'/list?id='+id,
        })
            .done(result=>{
                if(result.success===1){
                    if(tr.length>0){
                        tr.remove()
                    }
                }
            })
    })
})

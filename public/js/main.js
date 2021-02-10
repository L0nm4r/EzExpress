$(document).ready(function(){
  $('.delete-article').on('click',function(e){
    $target = $(e.target)
    $id=$target.attr('data-id')
    $.ajax({
      type:'DELETE',
      url:'/articles/'+$id,
      success:function(){
        alert("Delete successfully!")
        window.location.href="/"
      },
      error:function(err){
        alert("something wrong!")
      }
    })
  })
})


jQuery.fn.extend({
  autoHeight: function(){
      return this.each(function(){
          var $this = jQuery(this);
          if( !$this.attr('_initAdjustHeight') ){
              $this.attr('_initAdjustHeight', $this.outerHeight());
          }
          _adjustH(this).on('input', function(){
              _adjustH(this);
          });
      });
      /**
       * ���ø߶�
       * @param {Object} elem
       */
      function _adjustH(elem){
          var $obj = jQuery(elem);
          return $obj.css({height: $obj.attr('_initAdjustHeight'), 'overflow-y': 'hidden'})
                  .height( elem.scrollHeight );
      }
  }
});
// ʹ��
$(function(){
  $('textarea').autoHeight();
});
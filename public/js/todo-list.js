$(document).ready(() => {
    //focus on input
    document.querySelector('.logo').addEventListener('click', () => {location.assign('/todo')})
    document.querySelector('input').focus();

    //for POST
    $('form').on('submit',(e) => {
        e.preventDefault()

        let item = $('form input');
        let todo = {item: encodeURIComponent(item.val())};

        //if(todo.item.search(/[-?&\/\\]/) != -1){alert(`error, you can't use this characters: "&" "?" "/" "\" `);return;}

        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function(data) {
                location.reload();
            },
            error: function(err) {
                console.log(err);
            }
        })
    })
    
    //for DELETE
    $('li').on('click', function() {
        
        let item = encodeURIComponent($(this).text());
        $.ajax({
            type:"DELETE",
            url: "/todo/" + item,
            success: (data) => {
                location.reload();
            }
        })
    });
});


const express = require('express')
const routes = express.Router()

routes.get('/:id_film/:id_actor', (req, res)=>{
    
    let id_film = req.params.id_film;
    let id_actor = req.params.id_actor;
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query(`SELECT  distinct concat(actor.first_name, ' ',actor.last_name) AS 'Actor', 
        sakila.film.title AS 'Peliculas', category.name AS 'Categoría', 
        (SELECT avg(sakila.film.length)  FROM film) AS 'Promedio Duración',
        address.address AS 'Dirección de Tienda'
        FROM film 
        INNER JOIN film_actor ON film.film_id = film_actor.film_id 
        INNER JOIN actor ON film_actor.actor_id = actor.actor_id
        INNER JOIN film_category ON film.film_id = film_category.film_id
        INNER JOIN category ON film_category.category_id = category.category_id
        INNER JOIN inventory ON film.film_id = inventory.film_id
        INNER JOIN store ON inventory.store_id = store.store_id
        INNER JOIN address ON store.address_id = address.address_id
        WHERE (film.film_id = ${id_film} OR 0 = ${id_film}) AND (actor.actor_id = ${id_actor} OR 0 = ${id_actor})`,(err, rows)=>{

            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

routes.post('/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query("INSERT INTO actor set ?",[req.body], (err, rows)=>{

            if(err) return res.send(err)

            res.send('Actor Insert')
        })
    })
})

routes.post('/film_actor', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query("INSERT INTO film_actor set ?", [req.body], (err, rows)=>{
            if(err) return res.send(err)
            
            res.send('Actor related a film')
        })
    })
})

// routes.delete('/:id', (req, res)=>{
//     req.getConnection((err, conn)=>{
//         if(err) return res.send(err)

//         conn.query("DELETE FROM books WHERE id = ?",[req.params.id], (err, rows)=>{

//             if(err) return res.send(err)

//             res.send('Book Excluded')
//         })
//     })
// })

// routes.put('/:id', (req, res)=>{
//     req.getConnection((err, conn)=>{
//         if(err) return res.send(err)

//         conn.query("UPDATE books set ? WHERE id = ?",[req.body ,req.params.id], (err, rows)=>{

//             if(err) return res.send(err)

//             res.send('Book Update')
//         })
//     })
// })

module.exports = routes
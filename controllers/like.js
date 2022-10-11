const Sauce = require('../models/Sauce');

exports.likeSauce  = (req, res, next) => {
    const userId = req.body.userId;
    const like = req.body.like;

    Sauce.findOne({ _id: req.params.id })
        .then ((sauce) => {
            let liked = sauce.usersLiked.find((id) => id === userId);
            let disliked = sauce.usersDisliked.find((id) => id === userId);
  
            switch (like) {
                case 1:
                    sauce.likes += 1;
                    sauce.usersLiked.push(userId);
                    break;
  
                case 0: 
                    if (liked) {
                        sauce.likes -= 1;
                        sauce.usersLiked = sauce.usersLiked.filter((id) => id !== userId);
                    } else if (disliked) {
                        sauce.dislikes -= 1;
                        sauce.usersDisliked = sauce.usersDisliked.filter((id) => id !== userId);
                    }
                    break;
  
                case -1: 
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(userId);
                    break;
            }
  
            sauce.save()
                .then(() => res.status(201).json({ message: 'Modification enregistré !' }))
                .catch ((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(404).json({ error }));
}
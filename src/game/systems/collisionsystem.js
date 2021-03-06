define([
    'ash', 'game/nodes/spaceshipcollision', 'game/nodes/asteroidcollision',
    'game/nodes/bulletcollision'
], function (Ash, SpaceshipCollisionNode, AsteroidCollisionNode, BulletCollisionNode) {
    var CollisionSystem = Ash.System.extend({
        creator: null,
        spaceships: null,
        asteroids: null,
        bullets: null,

        constructor: function (creator) {
            this.creator = creator;
            return this;
        },

        addToEngine: function (game) {
            this.spaceships = game.getNodeList(SpaceshipCollisionNode);
            this.asteroids = game.getNodeList(AsteroidCollisionNode);
            this.bullets = game.getNodeList(BulletCollisionNode);
        },

        removeFromEngine: function (game) {
            this.spaceships = null;
            this.asteroids = null;
            this.bullets = null;
        },

        update: function (time) {
            var bullet, asteroid, spaceship;

            for (bullet = this.bullets.head; bullet; bullet = bullet.next) {
                for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(bullet.position.position) <=
                        asteroid.position.collisionRadius) {

                        this.creator.destroyEntity(bullet.entity);
                        if (asteroid.position.collisionRadius > 10) {
                            this.creator.createAsteroid(asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5);
                            this.creator.createAsteroid(asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5);
                            this.creator.createAsteroid(asteroid.position.collisionRadius - 10,
                                asteroid.position.position.x + Math.random() * 10 - 5,
                                asteroid.position.position.y + Math.random() * 10 - 5);    
                        }
                        this.creator.destroyEntity(asteroid.entity);
                        break;
                    }
                }
            }

            for (spaceship = this.spaceships.head; spaceship; spaceship = spaceship.next) {
                for (asteroid = this.asteroids.head; asteroid; asteroid = asteroid.next) {
                    if (asteroid.position.position.distanceTo(spaceship.position.position) <=
                        asteroid.position.collisionRadius + spaceship.position.collisionRadius) {

                        this.creator.destroyEntity(spaceship.entity);
                        break;
                    }
                }
            }
        }
    });

    return CollisionSystem;
});

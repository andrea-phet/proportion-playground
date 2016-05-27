// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var PropertySet = require( 'AXON/PropertySet' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Range = require( 'DOT/Range' );
  var Ball = require( 'PROPORTION_PLAYGROUND/explore/model/billiards/Ball' );
  var Vector2 = require( 'DOT/Vector2' );
  var ObservableArray = require( 'AXON/ObservableArray' );
  var Emitter = require( 'AXON/Emitter' );
  var Property = require( 'AXON/Property' );

  function BilliardsTableModel() {
    PropertySet.call( this, {
      length: 1,
      width: 1
    } );

    // These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.lengthProperty = this.lengthProperty || null;
    this.widthProperty = this.widthProperty || null;

    this.range = new Range( 1, 20 );

    this.ball = new Ball();

    // Keep track of collision points so the path can be shown as array of lines.
    this.collisionPoints = new ObservableArray();

    this.restartEmitter = new Emitter();

    Property.multilink( [
      this.lengthProperty,
      this.widthProperty
    ], this.restartBall.bind( this ) );
  }

  proportionPlayground.register( 'BilliardsTableModel', BilliardsTableModel );

  // Ball has collided with the wall, re-center at nearest integral coordinates so the trace doesn't get off course
  function round( x, y ) {
    return new Vector2( Math.round( x ), Math.round( y ) );
  }

  return inherit( PropertySet, BilliardsTableModel, {
    restartBall: function() {
      this.ball.restartBall( 0, this.length );
      this.collisionPoints.clear();
      this.restartEmitter.emit();
    },
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.restartBall();
    },
    // @private
    bounce: function( xVelocityScale, yVelocityScale, x, y ) {
      this.ball.velocity.x *= xVelocityScale;
      this.ball.velocity.y *= yVelocityScale;
      this.ball.position = round( x, y );
      this.collisionPoints.push( this.ball.position.copy() );
    },
    step: function( dt ) {

      // Cap DT
      dt = Math.min( dt, 1 / 16 * 4 );

      if ( this.length === 0 || this.width === 0 ) {
        return;
      }
      if ( this.collisionPoints.length === 0 ) {
        this.collisionPoints.add( this.ball.position.copy() );
      }
      this.ball.position = this.ball.position.plus( this.ball.velocity.times( dt ) );

      var vx = this.ball.velocity.x;
      var vy = this.ball.velocity.y;
      var x = this.ball.position.x;
      var y = this.ball.position.y;
      if ( vx > 0 && x >= this.width ) {
        this.bounce( -1, 1, this.width, y );
      }
      if ( vx < 0 && x <= 0 ) {
        this.bounce( -1, 1, 0, y );
      }
      if ( vy > 0 && y >= this.length ) {
        this.bounce( 1, -1, x, this.length );
      }
      if ( vy < 0 && y <= 0 ) {
        this.bounce( 1, -1, x, 0 );
      }

      // Stop the ball when it strikes a corner
      if (
        this.ball.position.equals( new Vector2( 0, 0 ) ) ||
        this.ball.position.equals( new Vector2( 0, this.length ) ) ||
        this.ball.position.equals( new Vector2( this.width, 0 ) ) ||
        this.ball.position.equals( new Vector2( this.width, this.length ) )
      ) {
        this.ball.velocity = new Vector2();
      }
    }
  } );
} );
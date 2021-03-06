// Copyright 2016, University of Colorado Boulder

/**
 * Model for the Apple Scene, which includes two groups of apples, red and green.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var AppleGroupModel = require( 'PROPORTION_PLAYGROUND/explore/model/apples/AppleGroupModel' );
  var ExploreSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/ExploreSceneModel' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );

  /**
   *
   * @param {boolean} predictMode - true for the Predict Screen which has a reveal button
   * @constructor
   */
  function AppleSceneModel( predictMode ) {
    ExploreSceneModel.call( this, predictMode, {
      showCostPerApple: false // {boolean} @public
    } );

    // @public (read-only) These assignments provide improved highlighting and navigation in IntelliJ IDEA 
    this.showCostPerAppleProperty = this.showCostPerAppleProperty || null;

    // @public
    this.redAppleGroup = new AppleGroupModel();
    this.greenAppleGroup = new AppleGroupModel();

    predictMode && this.registerChangeProperties( [
      this.redAppleGroup.numberOfApplesProperty,
      this.redAppleGroup.totalCostProperty,
      this.greenAppleGroup.numberOfApplesProperty,
      this.greenAppleGroup.totalCostProperty
    ] );
  }

  proportionPlayground.register( 'AppleSceneModel', AppleSceneModel );

  return inherit( ExploreSceneModel, AppleSceneModel, {

    /**
     * Reset the model
     * @public
     */
    reset: function() {
      ExploreSceneModel.prototype.reset.call( this );
      this.redAppleGroup.reset();
      this.greenAppleGroup.reset();
    }
  } );
} );
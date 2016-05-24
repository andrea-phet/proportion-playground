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
  var NecklaceSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/necklace/NecklaceSceneModel' );
  var PaintSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/paint/PaintSceneModel' );
  var BilliardsSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/billiards/BilliardsSceneModel' );
  var AppleSceneModel = require( 'PROPORTION_PLAYGROUND/explore/model/apples/AppleSceneModel' );
  var ProportionPlaygroundQueryParameters = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundQueryParameters' );

  /**
   * @constructor
   */
  function ExploreModel( predictMode ) {

    PropertySet.call( this, {
      scene: ProportionPlaygroundQueryParameters.SCENE
    } );
    this.necklaceSceneModel = new NecklaceSceneModel();
    this.paintSceneModel = new PaintSceneModel();
    this.billiardsSceneModel = new BilliardsSceneModel();
    this.appleSceneModel = new AppleSceneModel();

    // This line provided for code highlighting and navigation in IntelliJ IDEA
    // TODO: Delete this line
    this.sceneProperty = this.sceneProperty || null;

    // For Predict screen
    this.predictMode = predictMode;
  }

  proportionPlayground.register( 'ExploreModel', ExploreModel );

  return inherit( PropertySet, ExploreModel, {
    reset: function() {
      PropertySet.prototype.reset.call( this );
      this.necklaceSceneModel.reset();
      this.paintSceneModel.reset();
      this.billiardsSceneModel.reset();
      this.appleSceneModel.reset();
    },

    // @public
    step: function( dt ) {
      this.scene === 2 && this.billiardsSceneModel.step( dt ); // TODO: this index seems brittle
    }
  } );
} );
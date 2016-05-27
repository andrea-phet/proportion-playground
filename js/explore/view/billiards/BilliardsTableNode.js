// Copyright 2016, University of Colorado Boulder

/**
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var inherit = require( 'PHET_CORE/inherit' );
  var proportionPlayground = require( 'PROPORTION_PLAYGROUND/proportionPlayground' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Line = require( 'SCENERY/nodes/Line' );
  var ShadedSphereNode = require( 'SCENERY_PHET/ShadedSphereNode' );
  var Circle = require( 'SCENERY/nodes/Circle' );
  var ProportionPlaygroundConstants = require( 'PROPORTION_PLAYGROUND/ProportionPlaygroundConstants' );
  var Property = require( 'AXON/Property' );

  // constants
  var scale = 18; // from model units to pixels
  var whiteStrokeOptions = { stroke: 'white' };

  function BilliardsTableNode( center, billiardsTableModel, options ) {

    var movingLineOptions = { stroke: 'white', lineWidth: 2 };

    var gridLinesNode = new Node();
    var linesNode = new Node();
    var currentLineNode = new Line( 0, 0, 0, 0, movingLineOptions );

    // Model the edge outside of the green area (not as a stroke) since there is no way to do "outer" stroke
    var brownRectangle = new Rectangle( 0, 0, 0, 0, { fill: ProportionPlaygroundConstants.billiardsBrown } );
    var greenRectangle = new Rectangle( 0, 0, 0, 0, {
      fill: ProportionPlaygroundConstants.billiardsGreen,
      children: [ gridLinesNode, linesNode, currentLineNode ]
    } );

    var diameter = 10;
    var ballNode = new ShadedSphereNode( diameter, { mainColor: 'white', highlightColor: 'yellow' } );

    var createCircle = function() {
      return new Circle( diameter / 2, { fill: 'black' } );
    };
    var topLeftHoleNode = createCircle();
    var topRightHoleNode = createCircle();
    var bottomRightHoleNode = createCircle();

    billiardsTableModel.restartEmitter.addListener( function() {
      linesNode.children = [];
    } );

    billiardsTableModel.collisionPoints.addItemAddedListener( function( currentPoint ) {
      var a = billiardsTableModel.collisionPoints.getArray();
      var previousPoint = a[ a.length - 2 ];
      if ( previousPoint ) {
        linesNode.addChild( new Line(
          previousPoint.x * scale, previousPoint.y * scale,
          currentPoint.x * scale, currentPoint.y * scale,
          movingLineOptions ) );
      }
    } );

    billiardsTableModel.ball.positionProperty.link( function( position ) {
      var a = billiardsTableModel.collisionPoints.getArray();
      var previousPoint = a[ a.length - 1 ];
      if ( previousPoint ) {
        currentLineNode.setLine( previousPoint.x * scale, previousPoint.y * scale, position.x * scale, position.y * scale );
      }
    } );

    Property.multilink( [
      billiardsTableModel.lengthProperty,
      billiardsTableModel.widthProperty
    ], function() {
      var length = billiardsTableModel.length;
      var width = billiardsTableModel.width;

      var brownEdgeLineWidth = 8;
      var scaledWidth = width * scale;
      var scaledHeight = length * scale;
      var lineWidthAmount = brownEdgeLineWidth * 2;
      brownRectangle.setRect( 0, 0, scaledWidth + lineWidthAmount, scaledHeight + lineWidthAmount );
      greenRectangle.setRect( 0, 0, scaledWidth, scaledHeight );
      greenRectangle.center = center;

      var createGridLines = function() {
        var gridLines = [];

        // vertical lines
        for ( var i = 0; i <= width; i++ ) {
          gridLines.push( new Line( i * scale, 0, i * scale, scaledHeight, whiteStrokeOptions ) );
        }

        // horizontal lines
        for ( var k = 0; k <= length; k++ ) {
          gridLines.push( new Line( 0, k * scale, scaledWidth, k * scale, whiteStrokeOptions ) );
        }
        return gridLines;
      };
      // grid lines
      gridLinesNode.children = createGridLines();

      // TODO: Better layout for this, so we don't have to set translation of all the parts?
      brownRectangle.center = greenRectangle.center;

      bottomRightHoleNode.translation = greenRectangle.translation.plusXY( width * scale, length * scale );
      topLeftHoleNode.translation = greenRectangle.translation.plusXY( 0, 0 );
      topRightHoleNode.translation = greenRectangle.translation.plusXY( width * scale, 0 );

      greenRectangle.visible = width * length > 0;
      currentLineNode.visible = width * length > 0;
      ballNode.visible = width * length > 0;
    } );

    billiardsTableModel.ball.positionProperty.link( function( position ) {
      ballNode.center = position.times( scale ).plus( greenRectangle.translation );
    } );

    Node.call( this, {
      children: [
        brownRectangle,
        greenRectangle,
        topLeftHoleNode,
        topRightHoleNode,
        bottomRightHoleNode,
        ballNode
      ]
    } );
    this.mutate( options );
  }

  proportionPlayground.register( 'BilliardsTableNode', BilliardsTableNode );

  return inherit( Node, BilliardsTableNode );
} );
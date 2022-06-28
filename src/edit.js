/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import {
	ToolbarDropdownMenu,
	ToggleControl,
	PanelBody,
	__experimentalToolsPanelItem as ToolsPanelItem,
	__experimentalNumberControl as NumberControl,
} from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import {
	AlignmentControl,
	BlockControls,
	InspectorControls,
	RichText,
	useBlockProps,
	useSetting,
} from '@wordpress/block-editor';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { 
	attributes,
	mergeBlocks,
	onReplace,
	onRemove,
	setAttributes,
} ) {
	const { textAlign, content, placeholder, startNumber, endNumber } = attributes;
	const blockProps = useBlockProps( {
		className: classnames( {
			[ `has-text-align-${ textAlign }` ]: textAlign,
		} ),
	} );

	return (
		<>
			<BlockControls group="block">
				<AlignmentControl
					value={ textAlign }
					onChange={ ( newAlign ) =>
						setAttributes( { textAlign: newAlign } )
					}
				/>
			</BlockControls>

			<InspectorControls>
				<PanelBody title={ __( 'Counter settings' ) }>

					<NumberControl
						label={ __( 'Start number' ) }
						onChange={ ( newStartNumber ) =>
							setAttributes( { startNumber: newStartNumber } )
						}
						value={ startNumber }
					/>

					<NumberControl
						label={ __( 'End number' ) }
						onChange={ ( newEndNumber ) =>
							setAttributes( { endNumber: newEndNumber } )
						}
						value={ endNumber }
					/>

				</PanelBody>
			</InspectorControls>

			<RichText
				identifier="content"
				tagName="div"
				{ ...blockProps }
				value={ content }
				onChange={ ( newContent ) =>
					setAttributes( { content: newContent } )
				}
				onMerge={ mergeBlocks }
				onReplace={ onReplace }
				onRemove={ onRemove }
				placeholder={ placeholder }
			/>
		</>
	);
}

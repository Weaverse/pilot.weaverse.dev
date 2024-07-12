import type { HydrogenComponentSchema } from "@weaverse/hydrogen";
import { cva, type VariantProps } from "class-variance-authority";
import clsx from "clsx";
import { forwardRef } from "react";
import type { ButtonStyleProps } from "~/components/Button";
import Button, { buttonStylesInputs } from "~/components/Button";
import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";
import type { SectionProps } from "~/components/Section";
import { Section } from "~/components/Section";

let variants = cva("", {
	variants: {
		alignment: {
			left: "justify-start",
			center: "justify-center",
			right: "justify-end",
		},
		height: {
			small: "min-h-[40vh]",
			medium: "min-h-[50vh]",
			large: "min-h-[60vh]",
		},
	},
});

interface MapSectionProps
	extends Omit<SectionProps, "backgroundColor">,
		VariantProps<typeof variants>,
		ButtonStyleProps {
	address: string;
	heading: string;
	description: string;
	alignment: "left" | "center" | "right";
	buttonText: string;
	boxBgColor: string;
	boxTextColor: string;
	boxBorderRadius: number;
}

let MapSection = forwardRef<HTMLElement, MapSectionProps>((props, ref) => {
	let {
		height,
		alignment,
		heading,
		description,
		address,
		boxBgColor,
		boxTextColor,
		boxBorderRadius,
		buttonText,
		buttonStyle,
		backgroundColor,
		textColor,
		borderColor,
		backgroundColorHover,
		textColorHover,
		borderColorHover,
		...rest
	} = props;

	return (
		<Section
			ref={ref}
			{...rest}
			containerClassName={clsx(
				"flex items-start p-6 md:p-12",
				variants({ height, alignment }),
			)}
		>
			<iframe
				className="w-full h-full object-cover absolute inset-0 z-[-1]"
				title="Google map embedded frame"
				src={`https://maps.google.com/maps?t=m&q=${address}&ie=UTF8&&output=embed`}
			/>
			<div
				className="w-80 max-w-full shadow-2xl p-8 space-y-3 md:space-y-6"
				style={{
					backgroundColor: boxBgColor,
					color: boxTextColor,
					borderRadius: `${boxBorderRadius}px`,
				}}
			>
				{heading && <Heading content={heading} as="h3" alignment="left" />}
				{address && <Paragraph content={address} />}
				{description && <Paragraph content={description} />}
				{buttonText && (
					<Button
						text={buttonText}
						link={`https://www.google.com/maps/search/${address}`}
						openInNewTab
						variant="secondary"
						buttonStyle={buttonStyle}
						backgroundColor={backgroundColor}
						textColor={textColor}
						borderColor={borderColor}
						backgroundColorHover={backgroundColorHover}
						textColorHover={textColorHover}
						borderColorHover={borderColorHover}
					/>
				)}
			</div>
		</Section>
	);
});

export default MapSection;

export let schema: HydrogenComponentSchema = {
	type: "map",
	title: "Map",
	inspector: [
		{
			group: "Layout",
			inputs: [
				{
					type: "select",
					name: "height",
					label: "Section height",
					configs: {
						options: [
							{ value: "small", label: "Small" },
							{ value: "medium", label: "Medium" },
							{ value: "large", label: "Large" },
						],
					},
					defaultValue: "small",
				},
				{
					type: "toggle-group",
					name: "alignment",
					label: "Content alignment",
					configs: {
						options: [
							{ value: "left", label: "Left", icon: "align-start-vertical" },
							{
								value: "center",
								label: "Center",
								icon: "align-center-vertical",
							},
							{ value: "right", label: "Right", icon: "align-end-vertical" },
						],
					},
					defaultValue: "center",
				},
			],
		},
		{
			group: "Address box",
			inputs: [
				{
					type: "text",
					name: "address",
					label: "Address",
					defaultValue: "301 Front St W, Toronto, ON M5V 2T6, Canada",
				},
				{
					type: "text",
					name: "heading",
					label: "Heading",
					defaultValue: "Our store address",
				},
				{
					type: "richtext",
					label: "Description",
					name: "description",
					defaultValue:
						"<p>Mon - Fri, 8:30am - 10:30pm</p><p>Saturday, 8:30am - 10:30pm</p><p>Sunday, 8:30am - 10:30pm</p>",
				},
				{
					type: "color",
					name: "boxBgColor",
					label: "Background color",
					defaultValue: "#fff",
				},
				{
					type: "color",
					name: "boxTextColor",
					label: "Text color",
				},
				{
					type: "range",
					name: "boxBorderRadius",
					label: "Border radius",
					configs: {
						min: 0,
						max: 40,
						step: 2,
						unit: "px",
					},
					defaultValue: 0,
				},
				{
					type: "heading",
					label: "Direction button (optional)",
				},
				{
					type: "text",
					name: "buttonText",
					label: "Button text",
					defaultValue: "Get directions",
					placeholder: "Get directions",
				},
				...buttonStylesInputs,
			],
		},
	],
};

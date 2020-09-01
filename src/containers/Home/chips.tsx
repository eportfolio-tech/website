import React from "react";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Chip } from "@material-ui/core";
import FaceIcon from "@material-ui/icons/Face";
import Autocomplete from "@material-ui/lab/Autocomplete";

export interface IChip {
	type: string;
	content: string;
}

const useStyles = makeStyles(() =>
	createStyles({
		chip: {
			fontSize: 23,
			fontWeight: "bold",
			borderRadius: 40,
			height: "100%",
		},
		icon: {
			width: "1.2em",
			height: "1.2em",
		},
	})
);

interface IChips {
	chips: IChip[];
}

export function Chips({ chips }: IChips) {
	const classes = useStyles();

	const getIcon = (type: string) => {
		switch (type) {
			case "person":
				return <FaceIcon className={classes.icon} />;

			default:
				return (
					<Typography variant="h5" style={{ fontWeight: "bold" }}>
						#
					</Typography>
				);
		}
	};
	const getColor = (type: string) => {
		switch (type) {
			case "person":
				return "secondary";

			default:
				return "primary";
		}
	};

	return (
		<Autocomplete
			multiple
			id="size-small-filled-multi"
			size="small"
			options={chips}
			getOptionLabel={(option: IChip): string => option.content}
			defaultValue={[chips[1]]}
			renderTags={(value: any, getTagProps: any) =>
				value.map((option: IChip, index: number) => (
					<Chip
						label={option.content}
						{...getTagProps({ index })}
						color={getColor(option.type)}
						variant="default"
						icon={getIcon(option.type)}
						className={classes.chip}
					/>
				))
			}
			renderInput={(params) => {
				return (
					<TextField
						{...params}
						variant="outlined"
						label="Tags/Names"
						size="medium"
					/>
				);
			}}
		/>
	);
}

import { Button } from "@material-ui/core";
import { useTheme } from '@material-ui/core/styles';
import styles from './ExecuteButton.module.css';

export default function ExecuteButton(props) {

    const theme = useTheme();

    return (
        <Button className={styles.sendButton} {...props}>
            {props.children}
            <svg className={styles.svg} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 43 33">
                <path data-name="Polygone 1" d="M22.468 12.9a3 3 0 010 5.2L4.494 28.42A3 3 0 010 25.819V5.181a3 3 0 014.494-2.6z" fill={theme.palette.text.secondary} />
                <path className={styles.polymv} id='poly2' data-name="Polygone 2" d="M28.468 12.9a3 3 0 010 5.2L10.494 28.42A3 3 0 016 25.819V5.181a3 3 0 014.494-2.6z" fill={theme.palette.text.primary} />
            </svg>
        </Button>
    )
}
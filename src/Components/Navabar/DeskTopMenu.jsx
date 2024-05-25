import PropTypes from "prop-types";
import {
  useLocation,
  NavLink as RouterLink,
  useSearchParams,
} from "react-router-dom";
import { useRef, useState } from "react";
import { useEffect } from "react";
import {
  Box,
  Link,
  List,
  ListItem,
  ListSubheader,
  Paper,
  Stack,
  styled,
} from "@mui/material";
import { navMenuConfig } from "./navbarConfig";

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create("color"),
  "&:hover": {
    color: "red",
  },
}));
function IconBullet({ type = "item" }) {
  return (
    <Box sx={{ width: 24, height: 16, display: "flex", alignItems: "center" }}>
      <Box
        component="span"
        sx={{
          ml: "2px",
          width: 4,
          height: 4,
          borderRadius: "50%",
          bgcolor: "currentColor",
          ...(type !== "item" && {
            ml: 0,
            width: 8,
            height: 2,
            borderRadius: 2,
          }),
        }}
      />
    </Box>
  );
}
IconBullet.propTypes = {
  type: PropTypes.string,
};
const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.common.white,
  marginRight: theme.spacing(5),
  transition: theme.transitions.create("opacity", {
    duration: theme.transitions.duration.shortest,
  }),
  // "&:hover": {
  //   opacity: 0.48,
  //   textDecoration: "none",
  // },
}));
function MenuDesktopItem({
  item,
  pathname,
  isHome,
  isOpen,
  isOffset,
  onOpen,
  onClose,
  activeTab,
}) {
  const paperRef = useRef();
  const { title, path, children } = item;
  // const isActive = pathname === path;
  const extraContainers =
    children?.length % 15 === 0 ? 0 : 15 - (children?.length % 15);
  useEffect(() => {
    let timeoutId;
    const handler = (event) => {
      if (
        isOpen &&
        paperRef.current &&
        !paperRef.current.contains(event.target)
      ) {
        timeoutId = setTimeout(() => {
          onClose();
        }, 200);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
      clearTimeout(timeoutId);
    };
  }, [isOpen, onClose]);
  const handleClick = (event, title) => {
    event.preventDefault();
    if (isOpen !== title) {
      onOpen(title);
    }
  };
  return [
    <LinkStyle
      key={title}
      onClick={(event) => handleClick(event, title)}
      to={"#"}
      component={RouterLink}
      sx={{
        // ...(isHome && { color: "common.white" }),
        // ...(isOffset && { color: "text.primary" }),
        ...(isOpen && isOpen === title && { color: "white" }),
        width: "142px",
        height: "26px",
        padding: "6px 12px",
        textAlign: "center",
        fontFamily: "Open Sans",
        fontSize: "16px",
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: "85.714%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        background: isOpen && isOpen === title ? "white" : "transparent",
        color: isOpen && isOpen === title ? "blue" : "inherit",
        textDecoration: "none",
        borderRadius: isOpen && isOpen === title && "5px",
        ":hover ": {
          background: "white",
          color: "blue",
          textDecoration: "none",
          borderRadius: "5px",
        },
      }}
    >
      {title}
    </LinkStyle>,
    isOpen && isOpen === title && (
      <Paper
        ref={paperRef}
        elevation={12}
        sx={{
          width: "100%",
          position: "absolute",
          top: 90,
          left: 0,
          maxHeight: "500px",
          borderRadius: "15px",
          overflowY: "scroll",
          opacity: isOpen === title ? 1 : 0,
          transform: isOpen === title ? "translateY(0)" : "translateY(-4px)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          minHeight: "205px",
        }}
      >
        <div className="grid grid-cols-5 w-full gap-x-[18px]" ref={paperRef}>
          {children?.map((list) => {
            const { subheader, items } = list;
            return (
              <div
                key={subheader}
                className={`w-full border-r border-[#CBCBCB]`}
              >
                <List
                  sx={{
                    paddingLeft: "23px",
                    paddingRight: "23px",
                    paddingTop: "14px",
                    paddingBottom: "14px",
                  }}
                >
                  <ListSubheader
                    disableSticky
                    disableGutters
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "135%",
                      color: "#282828",
                      position: "relative", // Ensure positioning context for the pseudo-element
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "109.464px",
                        height: "2px",
                        backgroundColor: "#004DD7",
                        opacity: 0, // Initially hidden
                        transition: "opacity 0.3s ease", // Smooth transition
                      },
                      "&:hover::after": {
                        opacity: 1, // Show underline on hover
                      },
                    }}
                  >
                    {subheader}
                  </ListSubheader>
                  {items?.map((item) => (
                    <ListItemStyle
                      onClick={onClose}
                      key={item.title}
                      to={item.path}
                      component={RouterLink}
                      underline="none"
                      sx={{
                        ...(item.path === pathname && {
                          typography: "subtitle2",
                          color: "text.primary",
                        }),
                        marginTop: "0px",
                        paddingTop: "8px",
                      }}
                    >
                      <>
                        {/* <IconBullet /> */}
                        {item.title}
                      </>
                    </ListItemStyle>
                  ))}
                </List>
              </div>
              // </Grid>
            );
          })}
          {Array.from({ length: extraContainers }, (_, index) => index + 1).map(
            (extraHeader) => (
              <div
                key={extraHeader}
                className={`w-full border-r border-[#CBCBCB]`}
              >
                <List disablePadding>
                  <ListSubheader
                    disableSticky
                    disableGutters
                    sx={{
                      fontFamily: "Open Sans",
                      fontSize: "18px",
                      fontStyle: "normal",
                      fontWeight: 600,
                      lineHeight: "135%",
                      color: "#282828",
                      position: "relative", // Ensure positioning context for the pseudo-element
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "109.464px",
                        height: "2px",
                        backgroundColor: "#004DD7",
                        opacity: 0, // Initially hidden
                        transition: "opacity 0.3s ease", // Smooth transition
                      },
                      "&:hover::after": {
                        opacity: 1, // Show underline on hover
                      },
                    }}
                  />
                </List>
              </div>
            )
          )}
        </div>
      </Paper>
    ),
  ];
}
MenuDesktopItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string,
    children: PropTypes.arrayOf(
      PropTypes.shape({
        subheader: PropTypes.string.isRequired,
        path: PropTypes.string,
      })
    ),
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  activeTab: PropTypes.bool.isRequired,
  isHome: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default function MenuDesktop({ isOffset, isHome }) {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(null);
  const handleOpen = (title) => {
    setOpen(title);
  };
  const handleClose = () => {
    setOpen(null);
  };
  useEffect(() => {
    console.log("open", open);
  }, [open]);
  return (
    <Stack direction="row" justifyContent={"center"} alignItems={"center"}>
      {navMenuConfig?.map((link) => (
        <MenuDesktopItem
          key={link.title}
          item={link}
          pathname={pathname}
          activeTab={searchParams.get("current") === link.title}
          isOpen={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOffset={isOffset}
          isHome={isHome}
        />
      ))}
    </Stack>
  );
}
MenuDesktop.propTypes = {
  isHome: PropTypes.bool.isRequired,
  isOffset: PropTypes.bool.isRequired,
};
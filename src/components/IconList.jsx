import { Smile } from "lucide-react";
import React, { useState, useEffect } from "react";
import { icons } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { iconList } from "@/constants/icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import axios from "axios";

const BASE_URL = "https://logoexpress.tubeguruji.com";
function IconList({ selectedIcon }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [pngIconList, setPngIconList] = useState([]);
  const storageValue = JSON.parse(localStorage.getItem("value"));
  const [icon, setIcon] = useState(storageValue ? storageValue?.icon : "Smile");

  useEffect(() => {
    getPngIcons();
  }, []);
  const Icon = ({ name, color, size }) => {
    const LucidIcon = icons[name];
    if (!LucidIcon) {
      return;
    }
    return <LucidIcon color={color} size={size} />;
  };
  const getPngIcons = () => {
    axios.get(BASE_URL+'/getIcons.php').then(res => {
      console.log(res.data);
      setPngIconList(res.data);
    });
  }
    return (
      <div>
        <div>
          <label>Icon</label>
          <div
            onClick={() => setOpenDialog(true)}
            className="p-3 cursor-pointer bg-gray-200 rounded-md my-2 w-[50px] h-[50px] flex items-center justify-center "
          >
            {icon?.includes(".png") ? 
              <img src={BASE_URL + "/png/" + icon} />
             : 
              <Icon name={icon} size={20} color="#000" />
            }
          
          </div>
        </div>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Pic Your Favorite Icon</DialogTitle>
              <DialogDescription>
                <Tabs defaultValue="icon" className="w-[400px]">
                  <TabsList>
                    <TabsTrigger value="icon">Icons</TabsTrigger>
                    <TabsTrigger value="color-icon">Color Icons</TabsTrigger>
                  </TabsList>
                  <TabsContent value="icon">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-flow-col-5 gap-4 overflow-auto h-[400px] p-6">
                      {iconList.map((icon, index) => (
                        <div
                          className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <Icon name={icon} size={20} color="#000" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="color-icon">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-flow-col-5 gap-4 overflow-auto h-[400px] p-6">
                      {pngIconList.map((icon, index) => (
                        <div
                          className="border p-3 flex rounded-sm items-center justify-center cursor-pointer"
                          onClick={() => {
                            selectedIcon(icon);
                            setOpenDialog(false);
                            setIcon(icon);
                          }}
                        >
                          <img src={BASE_URL + "/png/" + icon} />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

export default IconList;


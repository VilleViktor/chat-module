 (function(){
 function updateScroll() {
        var element = doc.getElementById("chatmsg");
        element.scrollTop = element.scrollHeight;
    }
 var app = a.module('app', []);
   
app.controller('CHAT', function ($scope, $cookies, $timeout, $compile) {
            updateScroll();

            connect.on('nrOfCon', function (nr) {
                $scope.nrOFOnline = nr;
            });

            a.element.prototype.inChat = function (msg) {
                var template = '<li uib-popover="' + fcd(msg.date) + '" popover-trigger="mouseenter" popover-placement="top-left"><i class="fa fa-user"></i>' + msg.temporaryname + ': ' + msg.msg + '</li>';
                var insert = $compile(template)($scope);
                this.append(insert);
            };


            connect.on('chlastmsg', function (ch) {
                ch.forEach(function (msg) {
                    a.element(doc.querySelectorAll('.chatmsg')).inChat(msg);
                });
                updateScroll();
            });

            $scope.NameShow = true;
            if (name !== "") {
                $scope.temporaryname = name;
                $scope.NameShow = false;
                $scope.nameSet = true;
            }
            $scope.showChatDate = function (date) {
                console.log(date);
            };
            var open = false;
            $scope.showCh = "";
            $scope.shhiChat = true;
            $scope.chatbtn = "Visa chat";
            $scope.openChat = function () {
                if (!open) {
                    $scope.shhiChat = false;
                    $scope.showCh = "fadeInLeft";
                    $scope.chatbtn = "Göm chat";

                    open = true;
                } else if (open) {
                    $scope.showCh = "fadeOutLeft";
                    $timeout(function () {
                        $scope.shhiChat = true;
                    }, 300);
                    $scope.chatbtn = "Visa chat";

                    open = false;
                }
            };
            $scope.SendMessage = function () {
                if ($scope.NameShow && name === "" && typeof $scope.temporaryname !== 'undefined') {
                    name = $scope.temporaryname;
                    $cookies.put('VL_cn_0987166', ee(name), coexD);
                    $scope.NameShow = false;
                }
                else if (typeof $scope.name === 'undefined' && name === "") return $scope.errormsg = "* Ange namn!";
                if (typeof $scope.message === 'undefined') $scope.message = "";
                var msg = {
                    msg: $scope.message,
                    temporaryname: name,
                    i: i
                };
                connect.emit('cmsg', msg);
                $scope.message = "";
            };
            connect.on('cmsg', function (msg) {
                a.element(doc.querySelectorAll('.chatmsg')).inChat(msg);
                updateScroll();
                $scope.loadData();
            });
        });
        })(angular);
